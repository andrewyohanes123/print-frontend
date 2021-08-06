import { FC, ReactElement, useContext } from "react"
import { Button, Divider, Panel } from "rsuite"
import { EditorContext } from "."

const OrderSuccess: FC = (): ReactElement => {
  const { orderSuccess } = useContext(EditorContext);
  return (
    typeof orderSuccess !== 'undefined' ?
      <Panel bordered>
        <h4 style={{ textAlign: 'center' }}>Pemesanan berhasil</h4>
        <p style={{ textAlign: 'center' }}>Nomor pesanan Anda: {orderSuccess.order_number}</p>
        <Divider />
        <Button block appearance="primary" >Kembali ke halaman utama</Button>
      </Panel>
      :
      <></>
  )
}

export default OrderSuccess
