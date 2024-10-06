import React from "react";
import { Check } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";

type StepNumberProps = {
  step: number;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  isCurrentStep?: boolean;
  isFinished?: boolean;
  onClick?: (selected: boolean) => void;
  path: string;
  disabled?: boolean;
};
export default function StepNumber({
  step = 0,
  title,
  className,
  style,
  isCurrentStep = false,
  isFinished = false,
  onClick = () => {},
  disabled = false,
  path,
}: StepNumberProps) {
    const Comp = disabled ? "div" : Link;
  return (
    <Comp to={path} onClick={() => {!disabled ? onClick(true): null}} className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} h-full text-black hover:text-black flex flex-col gap-4 min-w-[8%] select-none justify-center items-center hover:bg-gray-200 py-4 px-4 transition-all active:bg-none`}>
      <div className="w-14">
        <AspectRatio ratio={1 / 1}>
          <div
            className={`w-full max-w-[5rem] transition-all h-full flex justify-center items-center ${
              isCurrentStep ? "bg-primary" : "bg-gray-300"
            } rounded-full`}
          >
            {
                isFinished ? <Check></Check> : <p className="text-2xl font-bold">{step}</p>
            }
          </div>
        </AspectRatio>
      </div>
      <p className="font-bold">{title}</p>
    </Comp>
  );
}
