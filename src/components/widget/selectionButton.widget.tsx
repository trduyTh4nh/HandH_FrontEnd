type SelectionButtonProps = {
    selected?: boolean;
    onClick: (selected: boolean) => void;
    children: React.ReactNode;
}
export default function SelectionButton(props: SelectionButtonProps) {
    return (
        <button onClick={() => props.onClick(!props.selected)} className={`cursor-pointer flex items-center gap-4 py-4 px-4 rounded-lg ${props.selected ? 'bg-primary' : 'bg-gray-100 text-black'}`}>
            {props.children}
        </button>
    )
}