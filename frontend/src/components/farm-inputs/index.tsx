"use client";
import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import FormFieldError from "../form-field-error";
import NumberInput from "../number-input";
import { seeds, states } from "../../utils/data";

const FarmInputs = ({ ...props }) => {
  const { currentFarm, errors, register, control } = props;

  return (
    <>
      <Input
        placeholder="Nome da fazenda"
        defaultValue={currentFarm?.farm ?? ""}
        {...register("farm", { required: true })}
      />
      <FormFieldError fieldError={errors.farm} />
      <Input
        placeholder="Cidade"
        defaultValue={currentFarm?.city ?? ""}
        {...register("city", { required: true })}
      />
      <FormFieldError fieldError={errors.city} />
      <Select
        label="Selecione o estado"
        placeholder="Qual é o seu estado?"
        defaultSelectedKeys={currentFarm?.state ? [currentFarm?.state] : []}
        {...register("state", { required: true })}
      >
        {states.map((item, key) => (
          <SelectItem key={key} className="bg-primary" value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      <FormFieldError fieldError={errors.state} />
      <NumberInput
        defaultValue={currentFarm?.total.toString() ?? ""}
        label="Área total em hectares da fazenda"
        {...register("total", { required: true })}
      />
      <FormFieldError fieldError={errors.total} />
      <NumberInput
        defaultValue={currentFarm?.agricultural?.toString() ?? ""}
        label="Área agricultável em hectares"
        {...register("agricultural")}
      />
      <FormFieldError fieldError={errors.agricultural} />
      <NumberInput
        defaultValue={currentFarm?.vegetation?.toString() ?? ""}
        label="Área de vegetação em hectares"
        {...register("vegetation")}
      />
      <FormFieldError fieldError={errors.vegetation} />
      <Controller
        name="seeds"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            className="label"
            label="Culturas plantadas"
            orientation="horizontal"
            defaultValue={currentFarm?.seeds ?? []}
            {...field}
          >
            {seeds.map((seed, key) => (
              <Checkbox key={key} value={seed} radius="full">
                {seed}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
    </>
  );
};

export default FarmInputs;
