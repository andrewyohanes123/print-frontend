import useErrorCatcher from "hooks/useErrorCatcher";
import { FC, ReactElement, useState, useEffect, useCallback } from "react"
import { Alert, Button, FlexboxGrid, InputNumber, Panel } from "rsuite"
import { ColorSizeStockAttributes } from "types"

interface props {
  stock: ColorSizeStockAttributes;
  onUpdateStock?: () => void;
}

const StockPanel: FC<props> = ({ stock, onUpdateStock }): ReactElement => {
  const [stockValue, setStockValue] = useState<number>(0);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { errorCatch } = useErrorCatcher();

  useEffect(() => {
    setStockValue(stock.stock);
  }, [stock]);

  const updateStock = useCallback(() => {
    toggleLoading(true);
    stock.update({ stock: stockValue }).then(resp => {
      Alert.success(`Stock size ${stock.Size.size} berhasil di-update menjadi ${resp.stock} buah`);
      toggleLoading(false);
      onUpdateStock && onUpdateStock();
    }).catch(e => {
      toggleLoading(false);
      errorCatch(e);
    });
  }, [stock, stockValue, onUpdateStock, errorCatch]);

  return (
    <Panel key={`${stock.id}`}>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={8}>
          {stock.Size.size}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <InputNumber min={0} disabled={loading} value={stockValue} onChange={value => setStockValue(parseInt(`${value}`))} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={3}>
          <Button color="blue" onClick={updateStock} disabled={loading} loading={loading}>Simpan</Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  )
}

export default StockPanel
