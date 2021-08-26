import { FC, ReactElement, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Button, Divider, Panel } from "rsuite"
import { EditorContext } from "."

const OrderSuccess: FC = (): ReactElement => {
  const { orderSuccess } = useContext(EditorContext);
  const { push } = useHistory();
  return (
    typeof orderSuccess !== 'undefined' ?
      <Panel bordered>
        <h4 style={{ textAlign: 'center' }}>Pemesanan berhasil</h4>
        <p style={{ textAlign: 'center' }}>Nomor pesanan Anda: </p>
        <h4 style={{ textAlign: 'center' }}>
          {orderSuccess.order_number}
        </h4>
        <p style={{textAlign: 'center'}} className="secondary-text" >Simpan nomor pesanan ini untuk melihat status pesanan</p>
        <Divider />
        <Button onClick={() => push('/')} block appearance="primary" >Kembali ke halaman utama</Button>
      </Panel>
      :
      <></>
  )
}

export default OrderSuccess
