import { RawOrderClothSideAttributes } from "types";

export const toBase64 = (side: RawOrderClothSideAttributes): Promise<RawOrderClothSideAttributes> => {
  return new Promise((resolve, reject)=> {
    const reader = new FileReader();
    reader.readAsDataURL(side.design_file as File);
    reader.onload = () => resolve({...side, design_file: `${reader.result}`});
    reader.onerror = (er) => reject(er);
  });
};