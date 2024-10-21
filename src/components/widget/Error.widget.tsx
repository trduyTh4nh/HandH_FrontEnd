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
type ErrorViewProps = {
  title: string;
  message: string;
  icon: "error" | "warning" | "unauthorized" | "notfound" | "notallowed" | "loading";
  children?: React.ReactNode;
  className?: string
};
export default function ErrorView(props: ErrorViewProps) {
  const icon = {
    error: <Ban width={64} height={64} />,
    warning: <TriangleAlert width={64} height={64} />,
    unauthorized: <OctagonMinus width={64} height={64} />,
    notfound: <SearchX width={64} height={64} />,
    notallowed: <ShieldBan width={64} height={64} />,
    loading: <Loader width={64} height={64} className="animate-spin"/>
  };
  return (
    <div className={`w-full flex flex-col items-center ${props.className}`}>
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        {icon[props.icon]}
        <h1>{props.title}</h1>
        <p>{props.message}</p>
        {props.children}
      </div>
      <img src="/logo_header.svg" className="w-40"/>
    </div>
  );
}
