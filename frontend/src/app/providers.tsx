"use client";
import { NextUIProvider } from "@nextui-org/react";
import FarmContextProvider from "../context/farmContextProvider";
type Props = {
  children?: React.ReactNode;
};

const AppProvider = ({ children }: Props) => (
  <FarmContextProvider>
    <NextUIProvider>{children}</NextUIProvider>
  </FarmContextProvider>
);

export default AppProvider;
