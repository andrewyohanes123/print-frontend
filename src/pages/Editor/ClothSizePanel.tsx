import { FC, ReactElement, useCallback } from "react"
import { Panel, FlexboxGrid, InputNumber, Tag } from "rsuite"
import { SizeAttributes } from "types"

interface props {
  size: SizeAttributes;
  amount: number;
  onChangeAmount: ({ id, amount, size_id }: { id: number; amount: number, size_id: number }) => void;
}

const ClothSizePanel: FC<props> = ({ size, amount, onChangeAmount }): ReactElement => {

  const onChange = useCallback((value: string | number) => {
    const parsedVal: number = parseInt(`${value}`);
    onChangeAmount({ id: size.color_size_stocks[0].id, amount: parsedVal, size_id: size.id });
  }, [onChangeAmount, size]);

  return (
    <Panel key={size.id}>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item>
          <Tag color="blue">Size {size.size}</Tag>
          <p>Stock tersisa: {size.color_size_stocks[0].stock}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <InputNumber defaultValue="0" value={amount} onChange={onChange} max={size.color_size_stocks[0].stock} min={0} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  )
}

export default ClothSizePanel
