import { FC, ReactElement } from "react"
import { Loader } from "rsuite"
import FullscreenDiv from "./FullscreenDiv"

const Loading: FC = (): ReactElement => {
  return (
    <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
      <Loader size="md" content="Loading" />
    </FullscreenDiv>
  )
}

export default Loading
