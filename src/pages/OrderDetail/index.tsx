import { EditorContext } from "pages/Editor";
import { FC, ReactElement, useCallback, useState } from "react";
import { OrderAttributes, RawOrderClothSideAttributes } from "types";
import Layout from "./Layout";

const OrderDetail: FC = (): ReactElement => {
  const [cloth_id, setClothId] = useState<number | undefined>(undefined);
  const [cloth_sides, setClothSides] = useState<RawOrderClothSideAttributes[]>([]);
  const [cloth_side_id, setClothSideId] = useState<number | undefined>(undefined);
  const [color_id, setColorId] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<number>(3);
  const [color, setColor] = useState<string>('white');
  const [orderSuccess, setOrderSuccess] = useState<OrderAttributes | undefined>(undefined);

  const setClothSide = useCallback((side: RawOrderClothSideAttributes) => {
    const newClothSides = [...cloth_sides, side];
    console.log(newClothSides);
    setClothSides(newClothSides);
  }, [cloth_sides]);

  return (
    <EditorContext.Provider value={{
      cloth_sides,
      cloth_id,
      cloth_side_id,
      color_id,
      step, color, orderSuccess, setOrderSuccess, setClothId, setClothSideId, setColor, setStep, setColorId, setClothSide, setClothSides
    }}>
      <Layout />
    </EditorContext.Provider>
  )
}

export default OrderDetail
