import { FC, ReactElement } from "react"
import { Loader } from "rsuite"
import FullscreenDiv from "./FullscreenDiv"

interface props {
  title: string;
  subTitle?: string;
}

const LoadingIndicator: FC<props> = ({title, subTitle}): ReactElement => {
  return (
    <FullscreenDiv background="white" flex={true} justifyContent="center" alignItems="center" flexDirection="column" >
      <Loader size="lg" />
      <h4>{title}</h4>
      <p><small className="text-secondary">{subTitle}</small></p>
    </FullscreenDiv>
  )
}

export default LoadingIndicator
