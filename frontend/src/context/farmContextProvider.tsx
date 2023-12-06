"use client";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import FarmContext, { FarmType, FarmerType } from "./farmContext";
import { apiFetch } from "../utils/api-fetch";
import { error } from "console";

type Props = {
  children: ReactNode;
};
const initialState = {} as FarmerType;
const FarmContextProvider: FC<Props> = ({ children }) => {
  const [farmer, setFarmer]: [
    FarmerType,
    Dispatch<SetStateAction<FarmerType>>,
  ] = useState(initialState);

  const addFarmState = (farm: FarmType) => {
    setFarmer({ ...farmer, farms: [...farmer.farms, farm] });
  };
  const deleteFarmState = (id: string) => {
    const farmsAvailables = farmer.farms.filter((farm) => farm.id !== id);

    setFarmer({ ...farmer, farms: farmsAvailables });
  };
  const updateFarmState = (farm: FarmType) => {
    const { farms } = farmer;
    const farmToUpdate = farms?.findIndex((item) => item.id === farm.id);
    if (farmToUpdate !== -1) {
      farms[farmToUpdate] = farm;
      setFarmer({ ...farmer, ...farms });
    }
  };
  const getFarmState = (id: string) => {
    return farmer.farms?.find((farm) => farm.id === id);
  };

  const value = {
    farmer,
    setFarmer,
    addFarmState,
    deleteFarmState,
    getFarmState,
    updateFarmState,
  };

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
};

export default FarmContextProvider;
