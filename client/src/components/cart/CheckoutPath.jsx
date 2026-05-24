import React from "react";
import { AccountBalance, LibraryAddCheck, LocalShipping } from "@mui/icons-material";

const CheckoutPath = ({ activePath }) => {
  const steps = [
    { label: "Shipping Details", icon: <LocalShipping /> },
    { label: "Confirm Order", icon: <LibraryAddCheck /> },
    { label: "Payment", icon: <AccountBalance /> },
  ];

  return (
    <div className="flex justify-center gap-8 md:gap-16 px-6 py-12 border-b border-gray-200">
      {steps.map((step, index) => {
        const isActive = activePath === index;
        const isCompleted = activePath >= index;

        return (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 relative flex-1 text-gray-400 
              ${isCompleted ? "text-green-500" : ""}`}
          >
            {/* Circle Icon */}
            <div
              className={`p-3 rounded-full transition-colors duration-300
                ${isActive ? "bg-blue-100" : "bg-gray-100"}
                ${isCompleted ? "bg-green-100" : ""}`}
            >
              {step.icon}
            </div>

            {/* Label */}
            <p className="text-sm font-medium">{step.label}</p>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <span
                className={`absolute top-6 left-1/2 w-full h-0.5 
                  ${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutPath;

