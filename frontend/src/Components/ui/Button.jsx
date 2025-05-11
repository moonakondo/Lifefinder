// src/Components/ui/Button.jsx

import React from "react";

const Button = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-lg shadow-md ";
  const variantStyles = variant === "outline"
    ? "border-2 border-white text-white hover:bg-white hover:text-black"
    : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };