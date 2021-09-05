import { FC, ReactElement, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Button, Divider, Panel } from "rsuite"
import { EditorContext } from "."
import qrcode from 'assets/qrcode.jpg'

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
        <p style={{ textAlign: 'center' }} className="secondary-text" >Simpan nomor pesanan ini untuk melihat status pesanan dan melakukan pembayaran</p>
        <Divider />
        <p style={{ textAlign: 'center' }}>Pembayaran bisa dilakukan dengan OVO</p>
        <img style={{ width: 300, height: 'auto', display: 'block', margin: '8px auto' }} alt="OVO Qrcode" src={qrcode} />
        <Divider>Atau</Divider>
        <p style={{ textAlign: 'center' }}>Via transfer ke nomor rekening</p>
        <h5 style={{ textAlign: 'center' }}>0728096070 (BNI)</h5>
        <p style={{ textAlign: 'center' }}>A.N BRILLIANT GALANT LAKSANDER</p>
        <Divider />
        <Button onClick={() => push('/')} block appearance="primary" >Kembali ke halaman utama</Button>
      </Panel>
      :
      <></>
  )
}

export default OrderSuccess
