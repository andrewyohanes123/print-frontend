import Container from "components/Container"
import { FC, ReactElement, Fragment } from "react"
import { FlexboxGrid } from 'rsuite'
import Canvas from "./Canvas"
import FormSection from "./FormSection"

const Layout: FC = (): ReactElement => {
  return (
    <Fragment>
      <Container>
        <FlexboxGrid justify="center">
          <FormSection />
          <Canvas />
        </FlexboxGrid>
      </Container>
    </Fragment>
  )
}

export default Layout
