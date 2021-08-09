import { baseUrl } from "App"
import { FC, ReactElement, useMemo, useCallback } from "react"
import { Button, Icon, Panel, FlexboxGrid } from "rsuite"
import { saveAs } from "file-saver"
import { OrderClothSideAttributes } from "types"

interface props {
  side: OrderClothSideAttributes;
}

const OrderClothSidePanel: FC<props> = ({ side }): ReactElement => {
  const fileUrl: string = useMemo<string>(() => (`${baseUrl}/public/files/${side.design_file}`), [side.design_file]);

  const downloadFile = useCallback(() => {
    saveAs(fileUrl, `Design - ${side.cloth_side.name}`);
  }, [fileUrl, side])

  return (
    <Panel bordered style={{ marginTop: 4, marginBottom: 4 }}>
      <FlexboxGrid align="middle">
        <FlexboxGrid.Item colspan={10}>
          <img alt={side.cloth_side.name} src={fileUrl} style={{ width: '100%' }} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Panel>
            <p>{side.cloth_side.name}</p>
            <Button color="green" onClick={downloadFile} block><Icon icon="download2" />&nbsp;Download design</Button>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  )
}

export default OrderClothSidePanel
