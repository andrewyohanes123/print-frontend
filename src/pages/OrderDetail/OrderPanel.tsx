import { FC, ReactElement, useState, useCallback } from "react"
import { Panel, Button, Uploader } from 'rsuite'
import moment from "moment"
import { OrderAttributes } from "types"
import DetailPanel from "./DetailPanel"
import { baseUrl } from "App"

interface props {
  order: OrderAttributes;
  publicView?: boolean;
  onUpdateOrder?: () => void;
}

const OrderPanel: FC<props> = ({ order, publicView }): ReactElement => {
  return (
    <Panel header={<h6>Data Orderan</h6>} defaultExpanded={true} collapsible bordered>
      <DetailPanel label="Nama pemesan" value={order.name} />
      <DetailPanel label="Email pemesan" value={order.email} />
      <DetailPanel label="Nomor telepon" value={order.phone} />
      <DetailPanel label="Dipesan pada" value={moment(order.updated_at).format('DD MMM YYYY hh:mm:ss')} />
      <DetailPanel label="Status Pesanan" value={order.status} />
      <DetailPanel label="Deskripsi" value={order.description === null ? 'Tidak Ada Deskripsi' : order.description} />
      {(!publicView && order.receipt_file !== null) && <Panel bordered>
        <h6>Resi Pembayaran</h6>
        <img alt="resi" src={`${baseUrl}/public/files/${order.receipt_file}`} />
      </Panel>}
      {
        publicView &&
        <Panel bordered>
          <Uploader>
            <Button>Pilih file resi</Button>
          </Uploader>
        </Panel>
      }
    </Panel>
  )
}

export default OrderPanel
