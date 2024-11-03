import { Tooltip } from "@mui/material";

export default function ColorChip({
  active,
  tooltip,
  color,
  onClick,
  image
}: {
  active: boolean;
  color: string;
  tooltip: string;
  onClick: (active: boolean) => void;
  image?: string
}) {
  return (
    <Tooltip title={tooltip}>
      <button
        className="bg-gray-100 px-4 py-2 flex gap-4 items-center rounded-full cursor-pointer"
        onClick={() => {
          onClick(true);
        }}
      >
        <div
          onClick={() => {
            onClick(true);
          }}
          className={`w-8 h-8 overflow-hidden rounded-full cursor-pointer shadow-md ${
            active ? "outline-2" : "outline-0"
          } outline-black outline-none hover:outline-2 hover:outline-black hover:outline-none active:outline-4 active:outline-black active:outline-none transition-all`}
          style={{ backgroundColor: color ? color : "transparent" }}
        >
          {
            image &&
            <img src={image} alt="color" className="w-full h-full object-cover"/>
          }
        </div>
        {
          tooltip &&
          <p>{tooltip}</p>
        }
      </button>
    </Tooltip>
  );
}
