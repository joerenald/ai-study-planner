import React from "react";

const Button = ({
children,
onClick,
variant = "primary",
size = "md",
type = "button",
className = "",
disabled = false,
}) => {

const baseStyle =
"font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400";

const variants = {
primary: "bg-blue-600 text-white hover:bg-blue-700",
secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
};

const sizes = {
sm: "px-3 py-2 text-sm",
md: "px-5 py-2.5 text-base",
lg: "px-7 py-3 text-lg",
};

// fallback protection
const safeVariant = variants[variant] || variants.primary;
const safeSize = sizes[size] || sizes.md;

return (
<button
type={type}
onClick={onClick}
disabled={disabled}
className={`${baseStyle} ${safeVariant} ${safeSize} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
>
{children} </button>
);
};

export default Button;
