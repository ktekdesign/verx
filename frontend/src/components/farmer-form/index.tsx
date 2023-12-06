"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Modal,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import FormFieldError from "../form-field-error";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppModal from "../app-modal";
import useFarm from "../../hooks";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
  addFarmer,
  getFarmer,
} from "../../database/repository/farm-repository";
import FarmInputs from "../farm-inputs";
import { formatCpfOrCnpj } from "@/utils";

const schema = yup
  .object({
    identity: yup
      .string()
      .matches(
        /(^\d{11}$)|(^\d{14}$)|(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/,
        { message: "Não é um CPF/CNPJ valido", excludeEmptyString: true },
      )
      .required("CPF / CNPJ é um campo obrigatório"),
    name: yup.string().required("Nome do produtor é um campo obrigatório"),
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
      .notRequired(),
    agricultural: yup
      .number()
      .min(0, "Deve ser informado um valor maior ou igual á 0")
      .notRequired(),
    seeds: yup.array(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const FarmerForm = () => {
  const { farmer, setFarmer } = useFarm();

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
    const {
      total,
      agricultural,
      vegetation,
      farm,
      city,
      state,
      seeds,
      name,
      identity,
    } = data;
    if (total < (agricultural || 0) + (vegetation || 0)) return onOpen();
    const farmFromForm = {
      id: nanoid(),
      farm,
      city,
      state,
      total,
      vegetation,
      agricultural,
      seeds,
    };
    const farmerData = {
      identity: formatCpfOrCnpj(identity),
      name,
      farms: [farmFromForm],
    };
    try {
      const farmerAdded = await addFarmer(farmerData);
      if (farmerAdded) {
        localStorage.setItem("id", farmerAdded.id);
        setFarmer(farmerAdded);
        router.push("/farms");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (farmer?.identity) return router.push("/farms");

    const id = localStorage.getItem("id");
    if (id && !farmer?.identity) {
      getFarmer(id).then((data) => setFarmer(data));
    }
  });

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
            <Input
              placeholder="CPF/CNPJ"
              {...register("identity", { required: true })}
            />
            <FormFieldError fieldError={errors.identity} />
            <Input
              placeholder="Nome do produtor"
              {...register("name", { required: true })}
            />
            <FormFieldError fieldError={errors.name} />
            <FarmInputs {...{ register, control, errors }} />
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

export default FarmerForm;
