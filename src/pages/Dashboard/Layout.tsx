import useAuth from "hooks/useAuth"
import useErrorCatcher from "hooks/useErrorCatcher"
import { FC, ReactElement, useCallback } from "react"
import { Sidebar as SideBar, Container, Content, Nav, Navbar, Dropdown, Icon } from 'rsuite'
import Routes from "./Routes"
import Sidebar from './Sidebar'

const Layout: FC = (): ReactElement => {
  document.title = "T-Design | Dashboard";
  const { auth, setLogout } = useAuth();
  const { errorCatch } = useErrorCatcher();

  const logout = useCallback(() => {
    auth.remove().then(resp => {
      console.log(resp.toString());
      setLogout();
    }).catch(errorCatch);
  }, [auth, setLogout, errorCatch]);

  const sidebarClick = useCallback((key: string) => {
    if (key === 'logout') {
      logout();
    }
  }, [logout]);

  return (
    <Container style={{ height: '100%' }}>
      <SideBar style={{ display: 'flex', flexDirection: 'column' }}>
        <Sidebar />
        <Navbar appearance="inverse">
          <Navbar.Body>
            <Nav pullRight>
              <Dropdown onSelect={sidebarClick} renderTitle={() => <Icon icon="cog" style={{ width: 56, height: 56, lineHeight: '56px', textAlign: 'center' }} />} trigger="click" placement="topStart">
                <Dropdown.Item eventKey="password" icon={<Icon icon="lock" />}>Ubah Password</Dropdown.Item>
                <Dropdown.Item eventKey="logout" icon={<Icon icon="sign-out" />}>Logout</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </SideBar>
      <Container style={{ height: '100%', overflow: 'auto' }}>
        <Content>
          <Routes />
        </Content>
      </Container>
    </Container>
  )
}

export default Layout
