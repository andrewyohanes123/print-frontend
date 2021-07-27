import { FC, ReactElement, useContext, useMemo } from "react"
import { baseUrl } from "App"
import Panel from "rsuite/lib/Panel"
import { RawClothSideAttributes } from "types"
import { EditorContext } from "."

interface props {
  side: RawClothSideAttributes;
  idx: number;
  onClick?: () => void;
}

const ClothSidePanel: FC<props> = ({ side, idx, onClick }): ReactElement => {
  const { cloth_side_id } = useContext(EditorContext);

  const active = useMemo(() => (idx === 0 && typeof cloth_side_id === 'undefined') || (cloth_side_id === side.id), [idx, cloth_side_id, side]);

  return (
    <Panel onClick={onClick} shaded={active} key={side.id} bodyFill bordered>
      <img draggable={false} style={{ width: '100%' }} alt={side.name} src={`${baseUrl}/public/files/${side.cloth_base}`} />
      <Panel className={active ? 'cloth-side-active' : ''}>
        <p><small>{side.name}</small></p>
      </Panel>
    </Panel>
  )
}

export default ClothSidePanel
