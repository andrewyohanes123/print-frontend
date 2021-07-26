import { FC, ReactElement } from "react"
import { Panel, Steps } from "rsuite"

const Step: FC = (): ReactElement => {
  return (
    <Panel style={{ marginBottom: 8 }} bordered >
      <Steps current={1}>
        <Steps.Item title="Pilih Pakaian" />
        <Steps.Item title="Design" />
        <Steps.Item title="Checkout" />
      </Steps>
    </Panel>
  )
}

export default Step
