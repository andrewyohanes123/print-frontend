import { FC, ReactElement, useState, lazy, Suspense } from "react"
import { Divider, FlexboxGrid, Icon, IconButton, Panel, Tooltip, Whisper } from "rsuite"
import { ColorAttributes } from "types"
import { ColorDisplay } from "components/ColorDisplay"

const ColorSizeStockModal = lazy(() => import('./ColorSizeStockModal'));

interface props {
  color: ColorAttributes;
}

const ColorPanel: FC<props> = ({ color }): ReactElement => {
  const [stockModal, toggleStockModal] = useState<boolean>(false);

  return (
    <>
      <Panel bordered>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item><ColorDisplay backgroundColor={color.color} /></FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <p key={color.id}>{color.name}</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Whisper trigger="hover" placement="topEnd" speaker={<Tooltip>Stock warna {color.name}</Tooltip>}>
              <IconButton onClick={() => toggleStockModal(true)} size="xs" color="blue" icon={<Icon icon="list-ol" />} />
            </Whisper>
            <Divider vertical />
            <IconButton size="xs" appearance="ghost" color="red" icon={<Icon icon="close" />} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
      <Suspense fallback={<></>}>
        <ColorSizeStockModal show={stockModal} onHide={() => toggleStockModal(false)} color={color} />
      </Suspense>
    </>
  )
}

export default ColorPanel
