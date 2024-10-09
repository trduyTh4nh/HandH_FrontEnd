import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Test(){
    const [localStorageKey, setLocalStorageKey] = React.useState<string>('');
    const [localStorageValue, setLocalStorageValue] = React.useState<string>('');
    function handleSaveLocalStorage(){
        const ls = localStorage.getItem(localStorageKey);
        setLocalStorageValue(ls || 'Không tìm thấy');
    }
    return (
        <div className="px-20 py-8">
            <h1>Trang dành cho nhà phát triển</h1>
            <p>Đây là trang dành cho nhà phát triển</p>
            <p>TODO: Nhớ xoá khi lên prod 😓</p>
            <h2>LocalStorage</h2>
            <Input placeholder="Nhập key" value={localStorageKey} className="w-1/2" onChange={(e) => {setLocalStorageKey(e.target.value)}}></Input>
            <Button className="mt-4" onClick={handleSaveLocalStorage}>Lấy</Button>
            <p>Kết quả: {localStorageValue}</p>
        </div>
    )
}