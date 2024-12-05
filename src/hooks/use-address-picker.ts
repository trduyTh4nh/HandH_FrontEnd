import axios from "axios";
import { useEffect, useState } from "react";
import { findById, findLevel1ById } from 'dvhcvn'
type AddressPickerProps = {
    defaultDistrict?: string;
}
export default function useAddressPicker(props: AddressPickerProps) {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  async function getDistricts() {
    const dis = findLevel1ById('79')
    setDistricts(dis.children);
  }
  async function getWards(districtName: any) {
    const res = findLevel1ById('79').findLevel2ByName(districtName)
    setWards(res.children);
  }
  useEffect(() => {
    getDistricts();
    if(props.defaultDistrict){
      getWards(props.defaultDistrict) 
    }
  }, []);
  return {
    districts,
    wards,
    getDistricts,
    getWards,
  };
}
