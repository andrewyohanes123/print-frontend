import { FC, ReactElement } from "react"
import { Divider, Icon, IconButton, Panel } from "rsuite"

const Header: FC = (): ReactElement => {
  return (
    <Panel style={{ marginBottom: 10 }} bordered>
      <IconButton appearance="subtle" icon={<Icon size="lg" icon="angle-left" />} />
      <Divider vertical>Kembali</Divider>
    </Panel>
  )
}

export default Header
