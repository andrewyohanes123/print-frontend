import Container from "components/Container"
import { FC, ReactElement, Fragment, useContext } from "react"
import { FlexboxGrid } from 'rsuite'
import { EditorContext } from "."
import Canvas from "./Canvas"
import ClothLists from "./ClothLists"
import FormSection from "./FormSection"
import Header from "./Header"
import Step from "./Step"

const Layout: FC = (): ReactElement => {

  const {cloth_id} = useContext(EditorContext);

  return (
    <Fragment>
      <Container>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item style={{ marginRight: 10 }} colspan={10}>
            <Header />
            <Step />
            {typeof cloth_id === 'undefined' ?
              <ClothLists />
              :
              <FormSection />
            }
          </FlexboxGrid.Item>
          <Canvas />
        </FlexboxGrid>
      </Container>
    </Fragment>
  )
}

export default Layout
