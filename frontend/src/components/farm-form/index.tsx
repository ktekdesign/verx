"use client";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppModal from "../app-modal";
import useFarm from "../../hooks";
import { useRouter } from "next/navigation";
import {
  getFarmer,
  addFarm,
  updateFarm,
} from "../../database/repository/farm-repository";
import { FarmType } from "../../context/farmContext";
import FarmInputs from "../farm-inputs";
import { nanoid } from "nanoid";

const schema = yup
  .object({
    farm: yup.string().required("Nome da fazenda é um campo obrigatório"),
    city: yup.string().required("Cidade é um campo obrigatório"),
    state: yup.string().required("Estado é um campo obrigatório"),
    total: yup
      .number()
      .positive("Deve ser informado um valor maior do que 0")
      .nonNullable()
      .required("É preciso digitar um valor"),
    vegetation: yup
      .number()
      .min(0, "Deve ser informado um valor maior ou igual á 0")
      .required("É preciso digitar um valor"),
    agricultural: yup
      .number()
      .min(0, "Deve ser informado um valor maior ou igual á 0")
      .required("É preciso digitar um valor"),
    seeds: yup.array(),
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

const FarmForm: FC<{ id?: string }> = ({ id }) => {
  const { farmer, setFarmer, updateFarmState, addFarmState } = useFarm();
  const [currentFarm, setCurrentFarm]: [
    FarmType | undefined,
    Dispatch<SetStateAction<FarmType | undefined>>,
  ] = useState();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { total, agricultural, vegetation, farm, city, state, seeds } = data;
    if (total < (agricultural || 0) + (vegetation || 0)) return onOpen();
    const farmFromForm = {
      id: id ?? nanoid(),
      farm,
      city,
      state,
      total,
      vegetation,
      agricultural,
      seeds: seeds ?? currentFarm?.seeds,
    };
    try {
      if (currentFarm) {
        const update = await updateFarm(farmFromForm);
        updateFarmState(update);
      } else {
        const add = await addFarm(farmer.id, farmFromForm);
        addFarmState(add);
      }
      router.push("/farms");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id && !farmer?.identity) router.push("/");
    if (id && !farmer?.identity) {
      getFarmer(id).then((data) => setFarmer(data));
    }
  });
  useEffect(() => {
    if (id) setCurrentFarm(farmer?.farms?.find((farm) => farm.id === id));
  }, [farmer, id]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-[600px] mx-auto">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                Preencha esse formulario para realizar o seu cadastro
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className=" flex flex-col gap-4">
            {id ? (
              currentFarm && (
                <FarmInputs {...{ currentFarm, register, control, errors }} />
              )
            ) : (
              <FarmInputs {...{ register, control, errors }} />
            )}
          </CardBody>
          <Divider />
          <CardFooter>
            <Button color="primary" size="lg" type="submit">
              Enviar
            </Button>
          </CardFooter>
        </Card>
      </form>
      <AppModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <p>
          A soma de área agrícultável e vegetação, não deve ser maior que a área
          total da fazenda
        </p>
      </AppModal>
    </>
  );
};

export default FarmForm;
