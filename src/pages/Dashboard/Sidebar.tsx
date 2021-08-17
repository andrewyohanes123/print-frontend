import useAuth from "hooks/useAuth";
import { FC, ReactElement } from "react"
import { useHistory, useLocation, useRouteMatch, Redirect } from "react-router-dom"
import { Sidenav, Nav, Icon } from 'rsuite'
import SidebarHeader, { Username, UserName } from "../../components/SidebarHeader";

const Sidebar: FC = (): ReactElement => {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const { push } = useHistory();
  const {login, user} = useAuth();

  return (
    !login ?
    <Redirect to="/login" />
    :
    <Sidenav appearance="inverse" onSelect={push} style={{ height: '100%' }} activeKey={pathname}>
      <Sidenav.Header>
        <SidebarHeader>
          <UserName>{user?.name}</UserName>
          <Username>{user?.username}</Username>
        </SidebarHeader>
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav>
          <Nav.Item eventKey={`${path}`} icon={<Icon icon="dashboard" />}>Dashboard</Nav.Item>
          <Nav.Item eventKey={`${path}/order`} icon={<Icon icon="order-form" />}>Order</Nav.Item>
          <Nav.Item eventKey={`${path}/kaos`} icon={<Icon icon="suitcase" />}>Pakaian</Nav.Item>
          <Nav.Item eventKey={`${path}/portfolio`} icon={<Icon icon="image" />}>Portfolio</Nav.Item>
          <Nav.Item eventKey={`${path}/tentang-kami`} icon={<Icon icon="wrench" />}>Pengaturan</Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  )
}

export default Sidebar
