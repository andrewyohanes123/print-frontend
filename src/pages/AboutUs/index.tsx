import { FC, ReactElement } from "react"
import Container from "components/Container"
import CreateArticle from "./CreateArticle"
import { Panel } from "rsuite"

const AboutUs: FC = (): ReactElement => {
  return (
    <Container>
      <h3 className="mb-2">Pengaturan</h3>
      <Panel bodyFill bordered header="Artikel">
        <CreateArticle />
      </Panel>
    </Container>
  )
}

export default AboutUs
