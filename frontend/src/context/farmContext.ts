import { Dispatch, SetStateAction, createContext } from "react";

export interface FarmType {
  id: string;
  farm: string;
  city: string;
  state: string;
  total: number;
  vegetation?: number | null;
  agricultural?: number | null;
  seeds?: string[];
}

export interface FarmerType {
  id: number;
  identity: string;
  name: string;
  farms: FarmType[];
}

type FarmContextData = {
  farmer: FarmerType;
  setFarmer: Dispatch<SetStateAction<FarmerType>>;
  addFarmState: (farm: FarmType) => void;
  deleteFarmState: (id: string) => void;
  getFarmState: (id: string) => FarmType | undefined;
  updateFarmState: (farm: FarmType) => void;
};
const FarmContext = createContext({} as FarmContextData);

export default FarmContext;
