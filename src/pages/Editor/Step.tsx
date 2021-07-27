import { FC, ReactElement, useContext } from "react"
import { Panel, Steps } from "rsuite"
import { EditorContext } from "."

const Step: FC = (): ReactElement => {
  const { step } = useContext(EditorContext)
  return (
    <Panel style={{ marginBottom: 8 }} bordered >
      <Steps current={step}>
        <Steps.Item title="Pilih Pakaian" />
        <Steps.Item title="Design" />
        <Steps.Item title="Checkout" />
      </Steps>
    </Panel>
  )
}

export default Step
