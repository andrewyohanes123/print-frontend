import { ClothSideImg } from "components/ClothSideImg"
import useModels from "hooks/useModels"
import { FC, ReactElement, useCallback, useContext, useEffect, useState } from "react"
import { Panel, FlexboxGrid, IconButton, Icon } from "rsuite"
import { EditorContext } from "."

interface props {
  alt?: string;
  src?: string;
  cloth_side_id: number;
}

const OrderClothSidePanel: FC<props> = ({ src, alt, cloth_side_id }): ReactElement => {
  const { models: { ClothSide } } = useModels();
  const { setClothSides, cloth_sides } = useContext(EditorContext);
  const [side, setSide] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);

  const getClothSide = useCallback(() => {
    ClothSide.single(cloth_side_id).then(resp => {
      setSide(resp.name);
    }).catch(e => {
      setRetryCount((count: number) => count + 1);
    });
  }, [cloth_side_id, ClothSide]);

  const removeClothSide = useCallback(() => {
    const new_cloth_sides = cloth_sides.filter(side => side.cloth_side_id !== cloth_side_id);
    setClothSides!(new_cloth_sides);
  }, [cloth_side_id, cloth_sides, setClothSides]);

  useEffect(() => {
    if (retryCount < 4) getClothSide();
  }, [retryCount, getClothSide])

  return (
    <Panel style={{ marginBottom: 8 }} bodyFill bordered>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={6}>
          <ClothSideImg alt={alt} src={src} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <h5>{side}</h5>
          <p><b>Harga&nbsp;:</b>&nbsp;Rp. &nbsp;25,000</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item style={{ padding: 8 }}>
          <IconButton onClick={removeClothSide} size="sm" color="red" icon={<Icon icon="close" />} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  )
}

export default OrderClothSidePanel
