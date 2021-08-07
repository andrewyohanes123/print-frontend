import { FC, ReactElement } from "react"
import { Button, Icon, Panel } from "rsuite"
import { OrderClothSideAttributes } from "types"

interface props {
  side: OrderClothSideAttributes;
}

const OrderClothSidePanel: FC<props> = ({ side }): ReactElement => {
  return (
    <Panel bordered style={{ marginTop: 4, marginBottom: 4 }}>
      {side.cloth_side.name}
      <Button><Icon icon="download2" />Download design</Button>      
    </Panel>
  )
}

export default OrderClothSidePanel
