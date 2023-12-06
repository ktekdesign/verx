import FarmContext from "../context/farmContext";
import { useContext } from "react";

export default function useFarm() {
  return useContext(FarmContext);
}
