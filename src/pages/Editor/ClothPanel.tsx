import { FC, ReactElement, useContext, useState } from "react"
import { Panel } from "rsuite"
import { RawClothAttributes } from "types"
import { EditorContext } from ".";

interface props {
  cloth: RawClothAttributes;
}

const ClothPanel: FC<props> = ({ cloth }): ReactElement => {
  const [hovered, toggleHovered] = useState<boolean>(false);
  const { setClothId, setStep } = useContext(EditorContext);

  return (
    <Panel
      shaded={hovered}
      onMouseLeave={() => toggleHovered(false)}
      onMouseEnter={() => toggleHovered(true)}
      style={{ marginTop: 4, marginBottom: 4 }}
      bordered
      onClick={() => {
        setClothId(cloth.id);
        setStep(1)
      }}
    >
      <h5>{cloth.name}</h5>
      <p className="secondary-text"><small>Rp. {cloth.price}</small></p>
    </Panel>
  )
}

export default ClothPanel
