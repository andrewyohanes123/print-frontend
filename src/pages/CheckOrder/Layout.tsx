import Container from "components/Container"
import PageHeader from "components/PageHeader"
import { FC, ReactElement } from "react"
import { useHistory } from "react-router-dom"
import { Panel } from 'rsuite'

const Layout: FC = (): ReactElement => {
  const { push } = useHistory();
  return (
    <Container>
      <PageHeader title="Cek Pesanan" subtitle="Cek Status Pemesanan" onBack={() => push('/')} />
      <Panel>
        
      </Panel>
    </Container>
  )
}

export default Layout
