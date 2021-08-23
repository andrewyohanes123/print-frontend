import { FC, ReactElement, useCallback, useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { Divider, Placeholder, FlexboxGrid, Button, Icon } from "rsuite";
import PageHeader from "components/PageHeader"
import useModels from "hooks/useModels";
import { OrderAttributes, OrderClothSideAttributes } from "types";
import useErrorCatcher from "hooks/useErrorCatcher";
import OrderPanel from "pages/OrderDetail/OrderPanel";
import Canvas from "pages/Editor/Canvas";
import Container from "components/Container";
import { EditorContext } from "pages/Editor";
import { baseUrl } from "App";
import OrderClothSides from "./OrderClothSides";
import OrderCounts from "./OrderCounts";

const Layout: FC = (): ReactElement => {
  const [order, setOrder] = useState<OrderAttributes | undefined>(undefined);
  const [retry, setRetry] = useState<number>(0);
  const [orderSides, setOrderSides] = useState<OrderClothSideAttributes[]>([]);
  const { push } = useHistory();
  const { models: { Order, OrderClothSide } } = useModels();
  const { id } = useParams<{ id: string }>();
  const { errorCatch } = useErrorCatcher();
  const { setColor, setClothSides, setClothSideId, setClothId, cloth_id } = useContext(EditorContext);

  const getOrderDetail = useCallback(() => {
    Order.single(parseInt(id)).then(resp => {
      setOrder(resp as OrderAttributes);
      setColor(resp.color.color);
      setClothId(resp.cloth_id);
    }).catch(e => {
      errorCatch(e);
      setRetry(attempt => attempt + 1);
    });
  }, [Order, id, errorCatch, setColor, setClothId]);

  const getOrderSides = useCallback(() => {
    OrderClothSide.collection({
      attributes: ['design_file', 'design_height', 'design_width', 'mockup_file', 'design_x', 'design_y', 'cloth_id', 'cloth_side_id', 'order_id', 'design_rotation'],
      where: {
        order_id: id
      },
      include: [{
        model: 'ClothSide',
        attributes: ['name']
      }, {
        model: 'Cloth',
        attributes: ['price']
      }]
    }).then(resp => {
      setOrderSides(resp.rows as OrderClothSideAttributes[]);
    }).catch(e => {
      errorCatch(e);
    })
  }, [OrderClothSide, id, errorCatch]);

  useEffect(() => {
    if (retry < 4) {
      getOrderDetail();
    }
    getOrderSides()
  }, [getOrderDetail, retry, getOrderSides]);

  useEffect(() => {
    if (orderSides.length > 0) {
      setClothSideId(orderSides[0].cloth_side_id!);
    }
    setClothSides!(orderSides.map(side => ({ ...side, design_file: `${baseUrl}/public/files/${side.design_file}` })));
    // eslint-disable-next-line
  }, [orderSides]);

  return (
    <>
      <PageHeader title="Detail Order" subtitle={order?.name ?? 'Loading...'} onBack={() => push('/dashboard/order')} />
      <Divider />
      <Container>
        <Button style={{ marginBottom: 8 }} color="green"><Icon icon="check" />&nbsp;Konfirmasi pemesanan</Button>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={11}>
            {typeof order !== 'undefined' &&
              <OrderPanel order={order} />
            }
            <OrderClothSides sides={orderSides} />
            {typeof order !== 'undefined' && <OrderCounts cloth_price={order.cloth.price} />}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            {typeof cloth_id === 'undefined' ?
              <Placeholder.Graph />
              :
              <Canvas preview={true} />}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </>
  )
}

export default Layout
