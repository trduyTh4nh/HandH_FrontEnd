import { Menu } from "@mui/icons-material";
const HeaderBottom: React.FC = () => {
  return (
    <div className="">
      <div className="pl-4 flex gap-2 items-center bg-button-primary hover:opacity-40 duration-200 ease-linear rounded-xl">
        <Menu className="text-black "></Menu>
        <input
          className="text-black pr-4 pt-4 pb-4 hover:cursor-pointer "
          type="button"
          value="Danh mục sản phẩm"
        />
      </div>
    </div>
  );
};

export default HeaderBottom;
