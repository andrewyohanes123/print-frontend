import { FC, ReactElement, useContext, useCallback } from "react"
import { Divider, Icon, IconButton, Panel } from "rsuite"
import { useHistory } from "react-router"
import { EditorContext } from "."

const Header: FC = (): ReactElement => {
  const { step, setStep } = useContext(EditorContext);
  const { push } = useHistory();

  const back = useCallback(() => {
    step === 0 && push('/');
    step > 0 && setStep(step - 1);
  }, [step, push, setStep]);

  return (
    <Panel style={{ marginBottom: 10 }} bordered>
      <IconButton onClick={back} appearance="subtle" icon={<Icon size="lg" icon="angle-left" />} />
      <Divider vertical>Kembali</Divider>
    </Panel>
  )
}

export default Header
