import moment from "moment"
import { FC, ReactElement } from "react"
import {Panel} from 'rsuite'
import { OrderAttributes } from "types"
import DetailPanel from "./DetailPanel"

interface props {
  order: OrderAttributes;
}

const OrderPanel: FC<props> = ({order}): ReactElement => {
  return (
    <Panel bordered>
      <DetailPanel label="Nama pemesan" value={order.name} />
      <DetailPanel label="Email pemesan" value={order.email} />
      <DetailPanel label="Nomor telepon" value={order.phone} />
      <DetailPanel label="Dipesan pada" value={moment(order.updated_at).format('DD MMM YYYY hh:mm:ss')} />
    </Panel>
  )
}

export default OrderPanel
