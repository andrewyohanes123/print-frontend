import { FC, ReactElement } from "react"
import Container from "components/Container"
import Layout from "./Layout"

const Clothes: FC = (): ReactElement => {
  return (
    <Container height={'calc(100% - calc(12px + 24px + 36px))'}>
      <h3>Kaos</h3>
      <Layout />
    </Container>
  )
}

export default Clothes
