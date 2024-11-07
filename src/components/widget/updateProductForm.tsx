import { useEffect, useState } from "react";
import ProductUploadForm, { ProductUploadFormProps } from "./productUploadForm";
import axios from "axios";

export default function UpdateProductForm(props: ProductUploadFormProps) {
    const { defaultValue } = props;
    const [editValue, setEditValue] = useState(defaultValue);
    async function handleConvertUrlToFile() {
        try {
            const url = editValue.product_thumb as string;
            const response = await axios.get(defaultValue.product_thumb as string, { responseType: "blob" });
            const fileName = url.split("/").pop();
            const newFile = new File([response.data], fileName, { type: response.data.type });
            setEditValue({
                ...editValue,
                product_thumb: newFile
            });
        } catch (error) {
            console.error("Error converting URL to file:", error);
        }
      }
    useEffect(() => {
        handleConvertUrlToFile();
    }, [defaultValue]); 
    return <ProductUploadForm onSubmit={(e) => {}} defaultValue={editValue}/>
}