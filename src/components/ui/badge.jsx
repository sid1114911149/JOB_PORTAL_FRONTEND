import * as React from "react";

function Badge({ className = "", variant = "default", ...props }) {
  const variantClass = `badge badge-${variant}`;
  return <div className={`${variantClass} ${className}`} {...props} />;
}

export { Badge };