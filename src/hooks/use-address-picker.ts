import axios from "axios";
import { useEffect, useState } from "react";
import { findById, findLevel1ById } from 'dvhcvn'
type AddressPickerProps = {
    defaultValues?: any;
}
export default function useAddressPicker(props: AddressPickerProps) {
    console.log(props.defaultValues)
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  async function getDistricts() {
    const dis = findLevel1ById('79')
    setDistricts(dis.children);
  }
  async function getWards(districtId: any) {
    const res = findLevel1ById('79').findLevel2ById(districtId)
    setWards(res.children);
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
