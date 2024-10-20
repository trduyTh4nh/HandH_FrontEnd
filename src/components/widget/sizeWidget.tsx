import React from "react";
import { Size } from "../pages/Shop";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

const SizeWidget: React.FC<Size> = (props) => {
  const { id, isPick, isMore, type, onClick } = props;

  const [checkMore, setCheckMore] = React.useState(false);
  return (
    <>
      <div className="size-box">
        <div className="size-box_wrap">
          {!isMore ? (
            <div key={id} className="flex gap-2 items-center ">
              <Checkbox
                onCheckedChange={(e) => {
                  if (onClick) {
                    onClick(type, id, e as boolean);
                  }
                }}
                name=""
                id=""
              />
              <p className="font-bold">{type}</p>
            </div>
          ) : (
            <div key={id} className="flex gap-2 items-center  ">
              <Checkbox
                onCheckedChange={(e) => {
                  if (onClick) {
                    onClick(type, id, e as boolean);
                    setCheckMore(e as boolean);
                  }
                }}
                name=""
                id=""
              />{" "}
              <Input
                type="text"
                disabled={!checkMore}
                style={{ opacity: checkMore ? 1 : 0.5 }}
                className="input-specific"
                name=""
                id=""
              />
              <p className="font-bold">{type}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SizeWidget;
