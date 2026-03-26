import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default-size", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classes = `button button-${variant} button-${size} ${className}`;
    return <Comp ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };