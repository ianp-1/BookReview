// nextjs-dashboard/app/ui/button.tsx
"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = clsx({
    "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500":
      variant === "default",
    "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500":
      variant === "secondary",
    "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500":
      variant === "destructive",
  });

  return (
    <button className={clsx(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
};

export { Button };
