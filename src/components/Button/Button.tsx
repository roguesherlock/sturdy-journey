import React from "react";
import { classNames } from "src/lib/utils";
import { motion } from "framer-motion";

interface Props extends React.ComponentPropsWithRef<"button"> {
  label?: string;
  size?: string;
  loading?: boolean;
  className?: string;
}
const Button = ({
  children,
  label,
  size,
  loading,
  className: otherClasses = "",
  ...rest
}: Props) => {
  let className =
    "relative inline-flex items-center border border-gray-300 shadow-sm rounded-md font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hot-red-500 transition ease-in-out duration-75 ";
  switch (size) {
    case "xs": {
      className += "px-2.5 py-1.5 text-xs rounded";
      break;
    }
    case "sm": {
      className += "px-3 py-2 text-sm leading-4";
      break;
    }
    case "md": {
      className += "px-4 py-2 text-sm";
      break;
    }
    case "lg": {
      className += "px-4 py-2 text-base";
      break;
    }
    case "xl": {
      className += "px-6 py-3 text-base";
      break;
    }
    default: {
      className += "px-4 py-2 text-sm";
      break;
    }
  }
  const buttonRest = (
    <>
      {label && <span>{label}</span>}
      {children}
    </>
  );

  return (
    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <button
        type="button"
        className={classNames(
          rest.disabled
            ? "cursor-not-allowed opacity-50 pointer-events-none"
            : "",
          loading ? "pointer-events-none" : "",
          className,
          otherClasses
        )}
        {...rest}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          buttonRest
        )}
      </button>
    </motion.span>
  );
};
export { Button };
export default Button;
