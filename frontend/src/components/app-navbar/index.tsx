"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
} from "@nextui-org/react";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="bg-dark backdrop-saturate-20 backdrop-blur-sm" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand className="flex gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-secondary"
        />
        <p className="font-bold text-primary">Verx</p>
      </NavbarBrand>
      <NavbarContent className={`${isMenuOpen ? "block absolute w-full h-36 pt-4 top-16 left-0 pl-4 bg-white" : "hidden"} sm:flex gap-4`} justify="center">
        <NavbarItem>
          <Link color="foreground" href="/farms/add">
            Adicionar uma fazenda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/farms">
            Minhas Propriedades
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;
