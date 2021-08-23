import { FlexboxGrid, IconButton, Icon, Divider } from "rsuite"
import Container from "components/Container"
import { Footer } from "components/Footer"
import { Header } from "components/FullscreenDiv"
import { FC, ReactElement } from "react"

const HomeFooter: FC = (): ReactElement => {
  return (
    <Footer>
      <Container className="mb-2">
        <FlexboxGrid justify="center" align="middle" gutter={16}>
          <FlexboxGrid.Item colspan={8} md={6}>
            <Header textColor="black" fontSize={25} as={'h1'}>Kontak Kami</Header>
            <p>Alamat : Tuminting, Tumumpa Dua, Lingk 4, Jl. Kuala Jati</p>
            <p>Email : t.design@gmail.com</p>
            <p>Nomor HP/WA : 085394698493</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item style={{ marginLeft: 12 }} md={12}>
            Ikuti Kami
            <Divider vertical />
            <IconButton icon={<Icon icon="facebook" size="2x" />} color="blue" />
            <Divider vertical />
            <IconButton icon={<Icon icon="instagram" size="2x" />} color="orange" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
      <p style={{textAlign: 'center'}} className="mt-1"><small>Copyright &copy; {new Date().getFullYear()} TagConn</small></p>
    </Footer>
  )
}

export default HomeFooter
