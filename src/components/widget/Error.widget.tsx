import {
  Ban,
  Loader,
  LucideIcon,
  OctagonMinus,
  SearchX,
  ShieldBan,
  TriangleAlert,
} from "lucide-react";
import { title } from "process";
import React from "react";
type ErrorIcons = typeof ShieldBan;
export type ErrorViewProps = {
  title: string;
  message: string;
  icon:
    | "error"
    | "warning"
    | "unauthorized"
    | "notfound"
    | "notallowed"
    | "loading";
  children?: React.ReactNode;
  className?: string;
  mini?: boolean;
};
export default function ErrorView(props: ErrorViewProps) {
  const iconSize = props.mini ? 32 : 64;
  const icon = {
    error: <Ban width={iconSize} height={iconSize} />,
    warning: <TriangleAlert width={iconSize} height={iconSize} />,
    unauthorized: <OctagonMinus width={iconSize} height={iconSize} />,
    notfound: <SearchX width={iconSize} height={iconSize} />,
    notallowed: <ShieldBan width={iconSize} height={iconSize} />,
    loading: (
      <Loader width={iconSize} height={iconSize} className="animate-spin" />
    ),
  };
  return (
    <div
      className={`w-full flex flex-col ${props.mini ? "" : "items-center"} ${
        props.className
      }`}
    >
      <div
        className={`h-full flex flex-col gap-2 ${
          props.mini ? "" : "justify-center items-center"
        }`}
      >
        {icon[props.icon]}
        <h1 className={`${props.mini ? "text-2xl" : ""}`}>{props.title}</h1>
        <p>{props.message}</p>
        {props.children}
      </div>
    </div>
  );
}
