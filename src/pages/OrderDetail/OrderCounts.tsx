import { FC, ReactElement, useState, useEffect, useCallback, useMemo } from "react"
import { List, Panel } from "rsuite"
import useModels from "hooks/useModels"
import { useParams } from "react-router-dom";
import { OrderCountAttributes } from "types";
import useErrorCatcher from "hooks/useErrorCatcher";
import OrderCountPanel from "./OrderCountPanel";
import Container from "components/Container";

interface props {
  cloth_price: number;
}

const OrderCounts: FC<props> = ({ cloth_price }): ReactElement => {
  const { models: { OrderCount } } = useModels();
  const [orderCounts, setOrderCounts] = useState<OrderCountAttributes[]>([]);
  const [retry, setRetry] = useState<number>(0);
  const { errorCatch } = useErrorCatcher();
  const { id } = useParams<{ id: string }>();

  const getOrderCounts = useCallback(() => {
    OrderCount.collection({
      attributes: ['order_id', 'amount', 'size_id'],
      include: [{
        model: 'Size',
        attributes: ['size']
      }],
      where: {
        order_id: id,
        amount: {
          $gt: 0
        }
      }
    }).then(resp => {
      setOrderCounts(resp.rows as OrderCountAttributes[]);
    }).catch(e => {
      errorCatch(e);
      setRetry(retry => retry + 1);
    });
  }, [OrderCount, id, errorCatch]);

  useEffect(() => {
    retry < 4 && getOrderCounts();
  }, [getOrderCounts, retry]);

  const totalOrder: number = useMemo<number>(() => (
    orderCounts.length > 0 ?
      orderCounts.map(count => (count.amount)).reduce((a, b) => a + b)
      :
      0
  ), [orderCounts]);

  const totalPrintPrice: number = useMemo<number>(() => (
    totalOrder * 25000
  ), [totalOrder]);

  const totalPrice: number = useMemo<number>(() => (
    (totalOrder * cloth_price) + totalPrintPrice
  ), [totalPrintPrice, cloth_price, totalOrder]);

  return (
    <Panel bodyFill style={{ marginTop: 8 }} bordered defaultExpanded collapsible headerRole="header" header={<h6>Size dan harga</h6>}>
      <List style={{ padding: 4 }}>
        {orderCounts.map(count => (
          <OrderCountPanel key={`${count.id}`} count={count} />
        ))
        }
      </List>
      <Container>
        <p><small>Total order</small></p>
        <h6>{totalOrder} buah</h6>
        <p><small>Harga sablon</small></p>
        <h6>Rp. {totalPrintPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
        <p><small>Total harga</small></p>
        <h6>Rp. {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h6>
      </Container>
    </Panel>
  )
}

export default OrderCounts
