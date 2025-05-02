import React from "react";
interface CardInterface {
  className?: string;
  children: any;
}
const Card = ({
  className = "mt-10",
  children,
}: CardInterface) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg min-h-[100px] p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
