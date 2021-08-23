import { FC, ReactElement, useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { Panel, Row, Grid, Col, Input, Button, Message, } from 'rsuite'
import Container from "components/Container"
import PageHeader from "components/PageHeader"
import { OrderAttributes } from "types"
import useModels from "hooks/useModels"
import useErrorCatcher from "hooks/useErrorCatcher"
import OrderPanel from "pages/OrderDetail/OrderPanel"

const Layout: FC = (): ReactElement => {
  const { push } = useHistory();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orders, setOrders] = useState<OrderAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);
  const [notFoundQuery, setNotFoundQuery] = useState<string>('');
  const [notFound, toggleNotFound] = useState<boolean>(false);
  const { errorCatch } = useErrorCatcher();
  const { models: { Order } } = useModels();

  const getOrders = useCallback(() => {
    toggleLoading(true);
    Order.collection({
      attributes: ['name', 'email', 'phone', 'status', 'updated_at', 'order_number', 'description'],
      where: {
        order_number: orderNumber
      }
    }).then(resp => {
      toggleNotFound(resp.rows.length === 0);
      toggleLoading(false);
      setNotFoundQuery(orderNumber);
      console.log('finish')
      setOrders(resp.rows as OrderAttributes[]);
    }).catch(errorCatch);
  }, [Order, orderNumber, errorCatch]);

  return (
    <Container>
      <PageHeader title="Cek Pesanan" subtitle="Cek Status Pemesanan" onBack={() => push('/')} />
      <Panel bordered>
        <Grid fluid>
          <Row>
            <Col md={12} xs={24} sm={24} lg={10}>
              <Input onPressEnter={getOrders} value={orderNumber} onChange={setOrderNumber} placeholder="Masukkan nomor pesanan" />
              <Button onClick={getOrders} loading={loading} style={{ marginTop: 8, marginBottom: 8 }} color="blue" >Cek Pesanan</Button>
              {loading &&
                <Message style={{ marginTop: 8 }} title="Loading Pesanan" type="info" description="Sedang memuat data pesanan. Harap tunggu" />
              }
              {
                !loading ?
                  notFound ?
                    <Message style={{ marginTop: 8 }} title="Pesanan Tidak Ditemukan" type="warning" description={`Pesanan dengan nomor ${notFoundQuery} tidak dapat ditemukan`} />
                    :
                    orders.map(order => (
                      <OrderPanel order={order} key={`${order.id}`} />
                    ))
                  :
                  <></>
              }
            </Col>
          </Row>
        </Grid>
      </Panel>
    </Container>
  )
}

export default Layout
