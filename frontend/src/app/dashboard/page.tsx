"use client";
import PieChartDashboard, { PieData } from "@/components/pie-chart-dashboard";
import {
  countFarms,
  countFarmsBySeed,
  countFarmsByState,
  totalFarms,
  totalFarmsByState,
  usageFarms,
} from "@/database/repository/farm-repository";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";

const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [countByState, setCountByState] = useState([]);
  const [totalByState, setTotalByState] = useState([]);
  const [areaUsage, setAreaUsage]: [
    PieData[],
    Dispatch<SetStateAction<PieData[]>>,
  ] = useState([] as PieData[]);
  const [seedByFarm, setSeedByFarm]: [
    PieData[],
    Dispatch<SetStateAction<PieData[]>>,
  ] = useState([] as PieData[]);

  useEffect(() => {
    Promise.all([
      countFarms(),
      totalFarms(),
      countFarmsByState(),
      totalFarmsByState(),
      usageFarms(),
      countFarmsBySeed(),
    ])
      .then((values) => {
        setCount(values[0]);
        setTotal(values[1]._sum.total);
        setCountByState(values[2]);
        setTotalByState(values[3]);
        if (values[4]) setAreaUsage(values[4]);
        if (values[5]) setSeedByFarm(values[5]);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div className="grid lg:grid-cols-2 gap-3 max-w-screen-lg mx-auto">
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">Total de fazendas em quantidade</h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <p className="text-3xl text-primary">{count}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">
            Total de fazendas em hectares (área total)
          </h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <p className="text-3xl text-secondary">{total}</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">
            Gráfico de pizza por quantidade por estado
          </h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <PieChartDashboard data={countByState} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">Gráfico de pizza por area por estado</h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <PieChartDashboard data={totalByState} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">Gráfico de pizza por uso de solo</h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <PieChartDashboard data={areaUsage} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="justify-center">
          <h3 className="text-xl">Gráfico de pizza por cultura</h3>
        </CardHeader>
        <Divider />
        <CardBody className="text-center">
          <PieChartDashboard data={seedByFarm} />
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(Dashboard);
