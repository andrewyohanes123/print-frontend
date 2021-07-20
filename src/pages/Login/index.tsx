import { FC, ReactElement } from "react"
import {FlexboxGrid, Content, Container, Panel, Form, FormControl, FormGroup, ControlLabel, Button, Icon} from 'rsuite'

const Login: FC = (): ReactElement => {
  return (
    <Container style={{ height: '100%' }}>
      <Content style={{ height: '100%' }}>
      <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
        <FlexboxGrid.Item colspan={12}>
          <Panel bordered header={<h4>Login</h4>}>
            <Form fluid>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl name="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" name="Password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Button appearance="primary" block><Icon icon="sign-in" />&nbsp;Login</Button>
              </FormGroup>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      </Content>
    </Container>
  )
}

export default Login
