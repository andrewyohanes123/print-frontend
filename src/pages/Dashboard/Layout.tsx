import { FC, ReactElement } from "react"
import { Sidebar as SideBar, Container, Content, Nav, Navbar, Dropdown, Icon } from 'rsuite'
import Routes from "./Routes"
import Sidebar from './Sidebar'

const Layout: FC = (): ReactElement => {
  document.title = "T-Design | Dashboard"
  return (
    <Container style={{ height: '100%' }}>
      <SideBar style={{ display: 'flex', flexDirection: 'column' }}>
        <Sidebar />
        <Navbar appearance="inverse">
          <Navbar.Body>
            <Nav pullRight>
              <Dropdown renderTitle={() => <Icon icon="cog" style={{ width: 56, height: 56, lineHeight: '56px', textAlign: 'center' }} />} trigger="click" placement="topStart">
                <Dropdown.Item icon={<Icon icon="lock" />}>Ubah Password</Dropdown.Item>
                <Dropdown.Item icon={<Icon icon="sign-out" />}>Logout</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </SideBar>
      <Container style={{ height: '100%' }}>
        <Content>
          <Routes />
        </Content>
      </Container>
    </Container>
  )
}

export default Layout
