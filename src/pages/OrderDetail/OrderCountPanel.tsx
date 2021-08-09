import { FC, ReactElement } from "react"
import { Panel } from "rsuite"
import { OrderCountAttributes } from "types"

interface props {
  count: OrderCountAttributes;
}

const OrderCountPanel: FC<props> = ({ count }): ReactElement => {
  return (
    <Panel style={{ marginBottom: 4, marginTop: 4 }}>
      <p className="secondary-text"><small>Size {count.Size.size}</small></p>
      <p>{count.amount}</p>
    </Panel>
  )
}

export default OrderCountPanel
