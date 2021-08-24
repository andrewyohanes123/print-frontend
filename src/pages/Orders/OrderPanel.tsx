import moment from "moment"
import { FC, ReactElement } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { Divider, Icon, IconButton, Panel } from "rsuite"
import { OrderAttributes } from "types"

interface props {
  order: OrderAttributes;
  onDelete?: () => void;
}

const OrderPanel: FC<props> = ({ order, onDelete }): ReactElement => {
  const { path } = useRouteMatch();
  return (
    <Panel style={{ marginBottom: 4, }} bordered>
      <h4><Link to={`${path}/detail/${order.id}`}>{order.name}</Link></h4>
      <p><small className="text-secondary">{moment(order.updated_at).fromNow()}</small></p>
      <Divider />
      <IconButton color="red" icon={<Icon icon="trash-o" />} onClick={onDelete} size="sm" />
    </Panel>
  )
}

export default OrderPanel
