import { GetColorName } from "hex-color-to-color-name";
import namer from "color-namer";
const convertMoney = (money: number): string => {
  const formattedMoney = money.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedMoney;
};

const convertMoneyP2 = (money: number): string => {
  const formattedMoney = money.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedMoney;
};
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function convertHextoColorName(hex: string): string {
  const colorNameEnglish = namer(hex).basic[0]?.name.toLowerCase();
  return colorMap[colorNameEnglish] || "Không xác định";
}

const colorMap: { [key: string]: string } = {
  red: "Đỏ",
  blue: "Xanh dương",
  green: "Xanh lá",
  yellow: "Vàng",
  purple: "Tím",
  orange: "Cam",
  black: "Đen",
  white: "Trắng",
  pink: "Hồng",
};
export { convertMoney, convertMoneyP2, formatBytes, convertHextoColorName };
