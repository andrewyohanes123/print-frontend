import Container from "components/Container"
import FullscreenDiv from "components/FullscreenDiv"
import { FC, ReactElement, useContext } from "react"
import { FlexboxGrid, Icon, Panel } from 'rsuite'
import { EditorContext } from "."
import Canvas from "./Canvas"
import ClothLists from "./ClothLists"
import ClothSide from "./ClothSide"
import FormSection from "./FormSection"
import Header from "./Header"
import OrderSuccess from "./OrderSuccess"
import Step from "./Step"
import Uploader from "./Uploader"

const Layout: FC = (): ReactElement => {

  const { step, cloth_id } = useContext(EditorContext);

  return (
    <>
      <Container>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item sm={24} style={{ marginRight: 10 }} colspan={10}>
            <Header />
            <Step />
            {step === 0 ?
              <ClothLists />
              :
              step === 1 ?
                <>
                  <ClothSide />
                  <Uploader />
                </>
                :
                step === 2 ?
                  <FormSection />
                  :
                  <OrderSuccess />
            }
          </FlexboxGrid.Item>
          {
            typeof cloth_id !== 'undefined' ?
              <Canvas />
              :
              <FlexboxGrid.Item sm={24} smHidden md={24} style={{ height: '100%' }} colspan={11} >
                <Panel bordered>
                  <FullscreenDiv style={{ height: 350 }} flex={true} alignItems="center" justifyContent="center" background="white" flexDirection="column" draggable={false}>
                    <Icon icon="suitcase" size="5x" />
                    <h4>Pilih Pakaian</h4>
                    <p className="secondary-text"><small>Silakan pilih pakaian pada daftar pakaian</small></p>
                  </FullscreenDiv>
                </Panel>
              </FlexboxGrid.Item>
          }
        </FlexboxGrid>
      </Container>
    </>
  )
}

export default Layout
