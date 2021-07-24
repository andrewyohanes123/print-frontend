import { FC, ReactElement, useCallback, useState } from "react"
import { Redirect } from "react-router";
import { FlexboxGrid, Content, Container, Panel, Form, FormControl, FormGroup, ControlLabel, Button, Icon, Schema } from 'rsuite'
import useAuth from "hooks/useAuth";
import useErrorCatcher from "hooks/useErrorCatcher";

const {StringType} = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired('Masukkan username'),
  password: StringType().isRequired('Masukkan password')
})

type loginForm = {
  [any: string]: any;
}

const Login: FC = (): ReactElement => {
  document.title = "T-Design | Login"
  const { auth, setLogin, login } = useAuth();
  const [formValue, setFormValue] = useState<any>({username: '', password: ''});
  const {errorCatch} = useErrorCatcher();

  const logIn = useCallback((valid: boolean) => {
    auth.set({...formValue}).then(resp => {
      setLogin(resp);
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, formValue, setLogin, auth])

  return (
    login ?
    <Redirect to="/dashboard" />
    :
    <Container style={{ height: '100%' }}>
      <Content style={{ height: '100%' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel bordered header={<h4>Login</h4>}>
              <Form 
              formValue={formValue} 
              onChange={(e: Record<string, loginForm>) => setFormValue(e)}
               model={model} 
               onSubmit={logIn}
               fluid>
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl name="username" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" name="password" placeholder="Password" />
                </FormGroup>
                <FormGroup>
                  <Button appearance="primary" type="submit" block><Icon icon="sign-in" />&nbsp;Login</Button>
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
