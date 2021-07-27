import { FC, ReactElement, createContext, useState, useCallback } from 'react'
import { RawOrderClothSideAttributes } from 'types'
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
}

export const EditorContext = createContext<editorContextType>({
  setClothId: () => console.log('object'),
  setClothSide: () => console.log('object'),
  cloth_sides: [],
  setClothSideId: () => console.log('object'),
  step: 0,
  setStep: () => console.log('object')
});

const Editor: FC = (): ReactElement => {
  const [cloth_id, setClothId] = useState<number | undefined>(undefined);
  const [cloth_sides, setClothSides] = useState<RawOrderClothSideAttributes[]>([]);
  const [cloth_side_id, setClothSideId] = useState<number | undefined>(undefined);
  const [step, setStep] = useState<number>(0);

  const setClothSide = useCallback((side: RawOrderClothSideAttributes) => {
    const newClothSides = [side, ...cloth_sides.filter(sd => sd.cloth_side_id === side.cloth_side_id)];
    setClothSides(newClothSides);
  }, [cloth_sides]);

  return (
    <EditorContext.Provider value={{ cloth_id, setClothId, setClothSide, cloth_sides, setClothSideId, cloth_side_id, setStep, step }}>
      <Layout />
    </EditorContext.Provider>
  )
}

export default Editor
