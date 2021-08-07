import { FC, ReactElement } from "react"
import { List, Panel } from "rsuite"
import { OrderClothSideAttributes } from "types"
import OrderClothSidePanel from "./OrderClothSidePanel"

interface props {
  sides: OrderClothSideAttributes[];
}

const OrderClothSides: FC<props> = ({ sides }): ReactElement => {

  return (
    <Panel style={{ marginTop: 8 }} bodyFill bordered>
      <List style={{ paddingRight: 4, paddingLeft: 4 }}>
        {sides.map(side => <OrderClothSidePanel key={side.id} side={side} />)}
      </List>
    </Panel>
  )
}

export default OrderClothSides
