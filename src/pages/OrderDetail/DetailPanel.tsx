import { FC, ReactElement } from "react"
import { Panel } from "rsuite"

interface props {
  label: string;
  value: string;
}

const DetailPanel: FC<props> = ({label, value}): ReactElement => {
  return (
    <Panel style={{marginBottom: 4, marginTop: 4}} bordered>
      <h6>{label}</h6>
      <p>{value}</p>
    </Panel>
  )
}

export default DetailPanel
