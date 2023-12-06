"use client";
import React, { Fragment, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import useFarm from "../../hooks";
import { useRouter } from "next/navigation";
import { states } from "../../utils/data";
import {
  deleteFarm,
  getFarmer,
} from "../../database/repository/farm-repository";

const Farms = () => {
  const { farmer, setFarmer, deleteFarmState } = useFarm();
  const router = useRouter();
  const handleRouter = (path: string) => router.push(path);
  const handleDelete = async (id: string) => {
    const deletedFarm = await deleteFarm(id);
    deleteFarmState(deletedFarm?.id);
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id && !farmer?.identity) {
      getFarmer(id).then((data) => data && setFarmer(data));
    }
  });
  return (
    <Card className="max-w-screen-lg mx-auto">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h1 className="text-md">Minhas fazendas</h1>
          <p>CPF / CNPJ: {farmer?.identity}</p>
          <p>Nome: : {farmer?.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-2 md:grid-cols-8 gap-4">
        <div>Fazenda</div>
        <div className="farm-info">Cidade</div>
        <div className="farm-info">Estado</div>
        <div className="farm-info">Total</div>
        <div className="farm-info">Vegetação</div>
        <div className="farm-info">Agricultável</div>
        <div className="farm-info">Culturas</div>
        <div>Ações</div>
        {farmer?.farms?.map((farm) => (
          <Fragment key={farm.id}>
            <div>{farm.farm}</div>
            <div className="farm-info">{farm.city}</div>
            <div className="farm-info">{states[Number(farm.state)]}</div>
            <div className="farm-info">{farm.total}</div>
            <div className="farm-info">{farm.vegetation}</div>
            <div className="farm-info">{farm.agricultural}</div>
            <div className="farm-info">{farm.seeds?.join(", ")}</div>
            <div className="grid grid-cols-1 gap-1">
              <Button
                color="primary"
                onClick={() => handleRouter(`/farms/edit/${farm.id}`)}
              >
                Alterar
              </Button>
              <Button
                color="secondary"
                onClick={async () => await handleDelete(farm.id)}
              >
                Remover
              </Button>
            </div>
          </Fragment>
        ))}
      </CardBody>
    </Card>
  );
};

export default Farms;
