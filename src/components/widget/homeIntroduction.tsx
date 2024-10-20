import React from "react"

type HomeIntroductionProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    className: string
}
export default function HomeIntroduction(props: HomeIntroductionProps) {
    return (
        <div className={`flex flex-col gap-2 ${props.className}`}>
            {props.icon}
            <h1 className="font-bold text-2xl">{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}