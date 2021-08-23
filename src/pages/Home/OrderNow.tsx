import FullscreenDiv, { Header } from "components/FullscreenDiv"
import { Button, Divider } from "rsuite"

const OrderNow = () => {
  return (
    <FullscreenDiv background="#d9f1f9" flex={true} flexDirection="column" justifyContent="center" alignItems="center">
      <Header textColor="black" fontSize={25} style={{ textAlign: 'center' }} as={'h1'}>Pesan Sekarang</Header>
      <p style={{ textAlign: 'center' }}>Design dan pesan pakaian</p>
      <Button style={{ margin: '1.25em auto' }} className="mt-1" color="cyan">Design dan Pesan</Button>
      <Divider style={{ width: '100%' }}>Atau</Divider>
      <Header textColor="black" fontSize={25} style={{ textAlign: 'center' }} as={'h1'}>Cek Pesanan</Header>
      <p style={{ textAlign: 'center' }}>Cek status pemesanan Anda</p>
      <Button style={{ margin: '1.25em auto' }} className="mt-1" color="cyan">Cek Status Pemesanan</Button>
    </FullscreenDiv>
  )
}

export default OrderNow
