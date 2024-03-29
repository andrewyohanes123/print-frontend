import { FC, ReactElement, createContext, useState, useCallback } from 'react'
import { OrderAttributes, RawOrderClothSideAttributes } from 'types'
import Layout from './Layout'

type editorContextType = {
  cloth_id?: number;
  setClothId: (id: number) => void;
  cloth_sides: RawOrderClothSideAttributes[],
  setClothSide: (side: RawOrderClothSideAttributes) => void;
  cloth_side_id?: number;
  setClothSideId: (id: number) => void;
  step: number;
  setStep: (step: number) => void;
  color: string;
  setColor: (color: string) => void;
  color_id?: number;
  setColorId: (color: number) => void;
  orderSuccess?: OrderAttributes;
  setOrderSuccess: (order: OrderAttributes) => void;
  setClothSides?: (sides: RawOrderClothSideAttributes[]) => void;
}

export const EditorContext = createContext<editorContextType>({
  setClothId: () => console.log('object'),
  cloth_sides: [],
  setClothSideId: () => console.log('object'),
  step: 0,
  setStep: () => console.log('object'),
  color: 'white',
  setColor: (color) => console.log(color),
  setColorId: (color) => console.log(color),
  setOrderSuccess: (order) => console.log(order),
  setClothSide: (cloth) => console.log(cloth)
});

const Editor: FC = (): ReactElement => {
  const [cloth_id, setClothId] = useState<number | undefined>(undefined);
  const [cloth_sides, setClothSides] = useState<RawOrderClothSideAttributes[]>([]);
  const [cloth_side_id, setClothSideId] = useState<number | undefined>(undefined);
  const [color_id, setColorId] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<number>(0);
  const [color, setColor] = useState<string>('white');
  const [orderSuccess, setOrderSuccess] = useState<OrderAttributes | undefined>(undefined);

  const setClothSide = useCallback((side: RawOrderClothSideAttributes) => {
    const newClothSides = [...cloth_sides.filter(sd => sd.cloth_side_id !== side.cloth_side_id), side];
    setClothSides(newClothSides);
  }, [cloth_sides]);

  return (
    <EditorContext.Provider value={{ cloth_id, setClothId, setClothSide, cloth_sides, setClothSideId, cloth_side_id, setStep, step, color, setColor, setColorId, color_id, orderSuccess, setOrderSuccess, setClothSides }}>
      <Layout />
    </EditorContext.Provider>
  )
}

export default Editor
