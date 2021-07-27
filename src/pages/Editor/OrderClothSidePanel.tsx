import { ClothSideImg } from "components/ClothSideImg"
import { FC, ReactElement } from "react"
import { Panel, FlexboxGrid, IconButton, Icon } from "rsuite"

interface props {
  alt?: string;
  src?: string;
}

const OrderClothSidePanel: FC<props> = ({src, alt}): ReactElement => {
  return (
    <Panel style={{ marginBottom: 8 }} bordered>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={6}>
          <ClothSideImg alt={alt} src={src} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <IconButton size="sm" color="red" icon={<Icon icon="trash2" />} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  )
}

export default OrderClothSidePanel
