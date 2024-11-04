import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import useAddressPicker from "@/hooks/use-address-picker";
import { UserContext } from "../contexts/UserContext";

export default function Test() {
  const [localStorageKey, setLocalStorageKey] = React.useState<string>("");
  const [localStorageValue, setLocalStorageValue] = React.useState<string>("");
  const [file, setFile] = React.useState<File>(null);
  const [url, setUrl] = React.useState<string>("");
  const {user, setUser} = useContext(UserContext);
  function handleSaveLocalStorage() {
    const ls = localStorage.getItem(localStorageKey);
    setLocalStorageValue(ls || "Không tìm thấy");
  }
  function handleWipeLocalStorage() {
    localStorage.removeItem(localStorageKey);
  }
  const { districts } = useAddressPicker({});
  async function handleConvertUrlToFile() {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const fileName = url.split("/").pop();
      const newFile = new File([response.data], fileName, {
        type: response.data.type,
      });
      setFile(newFile);
    } catch (error) {
      console.error("Error converting URL to file:", error);
    }
  }
  return (
    <div className="px-20 py-8">
      {/* <h1>Ko có gì ở đây hết 😗</h1> */}
      <h1>Trang dành cho nhà phát triển</h1>
      <p>Đây là trang dành cho nhà phát triển</p>
      <p>TODO: Nhớ xoá khi lên prod 😓</p>
      <h2>LocalStorage</h2>
      <Input
        placeholder="Nhập key"
        value={localStorageKey}
        className="w-1/2"
        onChange={(e) => {
          setLocalStorageKey(e.target.value);
        }}
      ></Input>
      <Button className="mt-4" onClick={handleSaveLocalStorage}>
        Lấy
      </Button>
      <Button className="mt-4" onClick={handleWipeLocalStorage}>
        Thanh Tẩy
      </Button>
      <p>Kết quả: {localStorageValue}</p>
      <h2>Url to File</h2>
      <Input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        placeholder="Nhập url"
        className="w-1/2"
      ></Input>
      <Button onClick={handleConvertUrlToFile} className="mt-4">
        Chuyển đổi
      </Button>
      <p>Kết quả:</p>
      {file && (
        <>
          <p>
            FileName: {file?.name} <br />
            FileSize: {file?.size} bytes <br />
          </p>
          <img src={URL.createObjectURL(file)} alt="preview" />
        </>
      )}
      <div>
        <h2>Address Picker</h2>
        <p>
          {districts.map((e) => {
            return <p>{e.name}</p>;
          })}
        </p>
      </div>
      <div>
        <h2>UserContext</h2>
        <p>User: {user ? user._id : ""}</p>
        <Button onClick={() => {
          setUser({_id: "1"})
        }}>Set User</Button>
      </div> 
    </div>
  );
}
