import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useContext, useState, useCallback, useEffect } from "react"
import { List } from "rsuite";
import { SizeAttributes } from "types";
import { EditorContext } from ".";
import ClothSizePanel from "./ClothSizePanel";

export interface OrderAmount {
  color_size_stock_id: number;
  amount: number;
  size_id: number;
}

interface props {
  onChangeOrderAmount: (orders: OrderAmount[]) => void;
}

const ClothSize: FC<props> = ({ onChangeOrderAmount }): ReactElement => {
  const { cloth_id, color_id } = useContext(EditorContext);
  const [sizes, setSizes] = useState<SizeAttributes[]>([]);
  const [orderAmount, setOrderAmount] = useState<OrderAmount[]>([]);
  const [retry, setRetry] = useState<number>(0);
  const { models: { Size } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getSizes = useCallback(() => {
    Size.collection({
      where: {
        cloth_id
      },
      include: [
        {
          model: 'ColorSizeStock',
          attributes: ['stock', 'color_id', 'id'],
          where: {
            color_id
          }
        }
      ],
      attributes: ['size', 'id']
    }).then(resp => {
      setSizes(resp.rows as SizeAttributes[]);
      setOrderAmount(resp.rows.map(row => ({ color_size_stock_id: row.color_size_stocks[0].id, amount: 0, size_id: row.id })))
    }).catch(e => {
      errorCatch(e);
      setRetry(retry => retry + 1);
    });
  }, [Size, cloth_id, color_id, errorCatch]);

  useEffect(() => {
    (retry < 4) && getSizes();
  }, [getSizes, retry]);

  const changeOrderAmount = useCallback(({ id, amount, size_id }: { id: number, amount: number, size_id: number }) => {
    const newOrderAmount = orderAmount.filter(order => order.color_size_stock_id !== id);
    setOrderAmount([...newOrderAmount, { color_size_stock_id: id, amount, size_id }]);
  }, [orderAmount]);

  useEffect(() => {
    onChangeOrderAmount(orderAmount);
  }, [orderAmount, onChangeOrderAmount])

  return (
    <List>
      {
        (sizes.length > 0 && orderAmount.length > 0) &&
        sizes.map(size => (
          <ClothSizePanel
            amount={orderAmount.find(order => order.color_size_stock_id === size.color_size_stocks[0].id)!.amount}
            onChangeAmount={changeOrderAmount}
            size={size}
            key={size.id}
          />
        ))
      }
    </List>
  )
}

export default ClothSize
