import FullscreenDiv, { Header } from "components/FullscreenDiv"
import { Button } from "rsuite"

const OrderNow = () => {
  return (
    <FullscreenDiv background="#d9f1f9" flex={true} flexDirection="column" justifyContent="center" alignItems="center">
      <Header textColor="black" fontSize={25} style={{ textAlign: 'center' }} as={'h1'}>Pesan Sekarang</Header>
      <p style={{ textAlign: 'center' }}>Design dan pesan pakaian</p>
      <Button style={{margin: '1.25em auto'}} className="mt-1" color="cyan">Design dan Pesan</Button>
    </FullscreenDiv>
  )
}

export default OrderNow
