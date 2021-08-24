import { FC, ReactElement } from "react"
import { Grid, Row, Col, Divider } from 'rsuite'
import Container from "components/Container"
import Statistic from "components/Statistic"

const Layout: FC = (): ReactElement => {
  return (
    <Container>
      <h4>Halaman Utama</h4>
      <Divider />
      <Grid fluid>
        <Row gutter={8}>
          <Col md={6}>
            <Statistic model="Cloth" options={{ attributes: ['name'] }} title="Pakaian" />
          </Col>
          <Col md={6}>
            <Statistic
              bacground="#2575fc"
              color="white"
              model="Order"
              options={{ attributes: ['name'], where: { status: "Menunggu Konfirmasi" } }}
              title="Order - Menunggu Konfirmasi"
            />
          </Col>
          <Col md={6}>
            <Statistic 
            bacground="#f5a623"
            color="#444"
            model="Order" 
            options={{ attributes: ['name'], where: { status: "Sementara Diproses" } }} 
            title="Order - Disproses"
             />
          </Col>
          <Col md={6}>
            <Statistic
            bacground="#5ea83e"
            color="#fff"
             model="Order" options={{ attributes: ['name'], where: { status: "Pesanan Selesai" } }} title="Order - Selesai" />
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default Layout
