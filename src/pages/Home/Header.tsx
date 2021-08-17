import { FC, ReactElement, useCallback } from 'react'
import { Navbar, Nav, Icon } from 'rsuite'
import { useHistory } from 'react-router-dom'
import logo from 'assets/logo.png'
import useAuth from 'hooks/useAuth'

const Header: FC = (): ReactElement => {
  const { login, user } = useAuth();
  const { push } = useHistory();

  const navMenuClick = useCallback((key: string) => {
    push(key)
  }, [push])

  return (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <img alt="t-design logo" className="navbar-brand logo" src={logo} style={{ width: 80, marginTop: 5, marginLeft: 5, marginRight: 7 }} />
      </Navbar.Header>
      <Navbar.Body>
        <Nav onSelect={navMenuClick}>
          <Nav.Item eventKey="editor" icon={<Icon icon="order-form" />}>Pesan</Nav.Item>
          <Nav.Item icon={<Icon icon="bookmark" />}>Tentang Kami</Nav.Item>
          <Nav.Item icon={<Icon icon="building2" />}>Portfolio</Nav.Item>
        </Nav>
        <Nav onSelect={navMenuClick} pullRight>
          {login ? <Nav.Item eventKey="dashboard" icon={<Icon icon="user-circle" />}>{user.name}</Nav.Item>
            :
            <Nav.Item eventKey="login" icon={<Icon icon="sign-in" />}>Login</Nav.Item>
          }
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export default Header
