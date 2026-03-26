import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

const RadioGroup = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={`radio-group ${className}`}
      {...props}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={`radio-item ${className}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="radio-indicator">
        <Circle />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };