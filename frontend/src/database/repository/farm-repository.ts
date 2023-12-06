import { seeds, states } from "@/utils/data";
import { FarmType, FarmerType } from "@/context/farmContext";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/";

export const getFarmer = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}farmers/${id}`);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addFarmer = async (farmer: Omit<FarmerType, "id">) => {
  try {
    const { data } = await axios.post(`${API_URL}farmers/add`, farmer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addFarm = async (farmerId: number, farm: FarmType) => {
  try {
    const { data } = await axios.post(
      `${API_URL}farms/add`,
      { farm, farmerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateFarm = async (farm: FarmType) => {
  try {
    const { id, ...farmData } = farm;
    const { data } = await axios.put(`${API_URL}farms/edit/${id}`, farmData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteFarm = async (id: string) => {
  try {
    const { data } = await axios.delete(`${API_URL}farms/delete/${id}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const countFarms = async () => {
  try {
    const { data } = await axios.get(`${API_URL}count/farms`);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const countFarmsByState = async () => {
  try {
    const { data } = await axios.get(`${API_URL}aggregate/state`);

    return data?.map(({ ...state }) => ({
      name: states[state.state],
      value: state._count.state,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const totalFarmsByState = async () => {
  try {
    const { data } = await axios.get(`${API_URL}aggregate/state/total`);

    return data?.map(({ ...state }) => ({
      name: states[state.state],
      value: state._sum.total,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const countFarmsBySeed = async () => {
  try {
    const { data } = await axios.get(`${API_URL}aggregate/seeds`);
    const seedsMaps = seeds.map((seed) => ({
      name: seed,
      value: 0,
    }));
    data?.map(({ ...seed }) => {
      seed.seeds?.map((item: string) => {
        const index = seedsMaps.findIndex((seedMap) => seedMap.name === item);
        if (index !== -1) seedsMaps[index].value += seed._count.seeds;
      });
    });
    return seedsMaps.filter((seed) => seed.value > 0);
  } catch (err) {
    console.error(err);
  }
};

export const totalFarms = async () => {
  try {
    const { data } = await axios.get(`${API_URL}aggregate/total`);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const usageFarms = async () => {
  try {
    const areas = await Promise.all([
      axios.get(`${API_URL}aggregate/agricultural`),
      axios.get(`${API_URL}aggregate/vegetation`),
    ]);

    return areas?.map((area, key) => ({
      name: key ? "Área de vegetação" : "Área agricultável",
      value: key ? area.data._sum.vegetation : area.data._sum.agricultural,
    }));
  } catch (err) {
    console.error(err);
  }
};
