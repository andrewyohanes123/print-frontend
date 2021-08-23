import { FC, ReactElement } from "react"
import {Panel} from 'rsuite'
import moment from "moment"
import { OrderAttributes } from "types"
import DetailPanel from "./DetailPanel"

interface props {
  order: OrderAttributes;
}

const OrderPanel: FC<props> = ({order}): ReactElement => {
  return (
    <Panel header={<h6>Data Orderan</h6>} defaultExpanded={true} collapsible bordered>
      <DetailPanel label="Nama pemesan" value={order.name} />
      <DetailPanel label="Email pemesan" value={order.email} />
      <DetailPanel label="Nomor telepon" value={order.phone} />
      <DetailPanel label="Dipesan pada" value={moment(order.updated_at).format('DD MMM YYYY hh:mm:ss')} />
      <DetailPanel label="Status Pesanan" value={order.status} />
      <DetailPanel label="Deskripsi" value={order.description === null ? 'Tidak Ada Deskripsi' : order.description} />
    </Panel>
  )
}

export default OrderPanel
