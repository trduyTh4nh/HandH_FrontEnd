import axios from "axios";
import { useEffect, useState } from "react";
type AddressPickerProps = {
    defaultValues?: any;
}
export default function useAddressPicker(props: AddressPickerProps) {
    console.log(props.defaultValues)
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  async function getDistricts() {
    const res = await axios.get("https://esgoo.net/api-tinhthanh/2/79.htm");
    setDistricts(res.data.data);
  }
  async function getWards(districtId: any) {
    const res = await axios.get(
      `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
    );
    setWards(res.data.data);
  }
  useEffect(() => {
    getDistricts();
    if(props.defaultValues){
        getWards(JSON.parse(props.defaultValues.state).id)
    }
  }, []);
  return {
    districts,
    wards,
    getDistricts,
    getWards,
  };
}
