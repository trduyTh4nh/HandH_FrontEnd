import ErrorView, { ErrorViewProps } from "./Error.widget";
type ProductErrorViewProps = {
    title: string;
    message: string;
    icon: "error" | "warning" | "unauthorized" | "notfound" | "notallowed" | "loading";
    children?: React.ReactNode;
    className?: string;
    mini?: boolean;
    count?: number;
};
export default function ProductErrorView(props: ProductErrorViewProps) {
    const arr = Array.from(Array(props.count).keys());
    return <div className="relative grid grid-cols-4 gap-4">
        {
            arr.map((e) => {
                return <div className="bg-gray-300 w-full h-[480px] rounded-2xl" />
            })
        }
        <div className="px-8 absolute flex justify-center items-center w-full h-full bg-background/85">
            <ErrorView {...props} />
        </div>
    </div>
}