import { Input } from "@nextui-org/react";
import { Ref, forwardRef, memo } from "react";

const NumberInput = forwardRef(
  (
    { label, defaultValue, ...props }: { label: string; defaultValue?: string },
    ref: Ref<HTMLInputElement>,
  ) => (
    <Input
      label={label}
      defaultValue={defaultValue}
      type="number"
      placeholder="0.00"
      labelPlacement="outside"
      min={0}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">ha</span>
        </div>
      }
      ref={ref}
      {...props}
    />
  ),
);

NumberInput.displayName = "NumberInput";

export default memo(NumberInput);
