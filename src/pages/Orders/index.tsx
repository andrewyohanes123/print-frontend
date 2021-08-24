import { FC, ReactElement, useState, useEffect, useCallback, useMemo } from "react"
import { Alert, FlexboxGrid, Input } from 'rsuite'
import { ModelCollectionResult, OrderAttributes } from "types"
import Container from "components/Container"
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";
import Lists from "./Lists";

const Orders: FC = (): ReactElement => {
  const [orders, setOrders] = useState<ModelCollectionResult<OrderAttributes>>({ rows: [], count: 0 });
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const limit = useMemo<number>(() => 10, []);
  const { models: { Order } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getOrders = useCallback(() => {
    const offset = (page - 1) * limit;
    Order.collection({
      attributes: ['name', 'email', 'phone', 'status', 'updated_at', 'order_number'],
      order: [['updated_at', 'desc']],
      limit,
      offset,
      where: {
        name: { $iLike: `%${query}%` }
      }
    }).then(resp => {
      setOrders(resp as ModelCollectionResult<OrderAttributes>);
    }).catch(e => {
      errorCatch(e);
    })
  }, [Order, errorCatch, limit, page, query]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const deleteOrder = useCallback((order: OrderAttributes) => {
    order.delete().then(resp => {
      getOrders();
      Alert.success(`Orderan atas nama ${resp.name} berhasil dihapus`);
    }).catch(errorCatch);
  }, [getOrders, errorCatch]);

  return (
    <>
      <Container>
        <h3>Order</h3>
        <FlexboxGrid style={{ marginTop: 4, marginBottom: 8 }} justify="space-between" align="middle">
          <FlexboxGrid.Item></FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <Input placeholder="Cari berdasarkan nama" value={query} onChange={setQuery} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
      <Lists onDelete={deleteOrder} data={orders.rows} pagination={{ page, limit, total: orders.count, onSelect: setPage }} />
    </>
  )
}

export default Orders
