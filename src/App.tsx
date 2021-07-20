import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
import Adapter from '@edgarjeremy/sirius.adapter'
import { IModelFactory } from '@edgarjeremy/sirius.adapter';
import AuthProvider from '@edgarjeremy/sirius.adapter/dist/libs/AuthProvider';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css'
import useAuth from 'hooks/useAuth';
import useModels from 'hooks/useModels';
import FullscreenDiv, { Header } from 'components/FullscreenDiv';
import { Button, Loader } from 'rsuite';
import moment from 'moment';
import Login from 'pages/Login';
import Editor from 'pages/Editor';

const { REACT_APP_IP_ADDRESS, REACT_APP_PORT }: NodeJS.ProcessEnv = process.env;

const Connect = new Adapter(REACT_APP_IP_ADDRESS!, parseInt(REACT_APP_PORT!), localStorage);

function App() {
  const [localModels, setLocalModels] = useState<IModelFactory>({});
  const [ready, toggleReady] = useState<boolean>(false);
  const [error, toggleError] = useState<boolean>(false);
  const { setAuth, setLogin, setLogout, auth } = useAuth();
  const { setModels } = useModels();

  document.title = "T-Design"

  moment.locale('id');

  const connect = useCallback(() => {
    toggleReady(false);
    Connect.connect().then(models => {
      setLocalModels(models);
      toggleError(false);
      console.log('connect')
    }).catch(e => {
      console.log(e);
      toggleError(true);
      document.title = "Oops... terjadi kesalahan. Silakan coba lagi"
    })
  }, [toggleError, setLocalModels]);

  useEffect(() => {
    connect();
  }, [connect]);
  // eslint-disable-next-line
  useEffect(() => {
    if (typeof auth !== 'undefined') {
      Connect.getAuthProvider().get().then((user): void => {
        setLogin(user)
        toggleReady(true);
      }).catch(e => {
        console.log(e)
        setLogout!();
        toggleReady(true);
      })
    }
    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => {
    if (Object.keys(localModels).length > 0) {
      setModels(localModels);
      const auth: AuthProvider = Connect.getAuthProvider();
      setAuth(auth);
    }
    // eslint-disable-next-line
  }, [localModels]);

  return (
    !ready ?
      error ?
        <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
          <Header as="h4" style={{ color: 'black', fontSize: 25, marginBottom: 10 }}>Tidak dapat terhubung dengan server</Header>
          <Button onClick={connect}>Coba Lagi</Button>
        </FullscreenDiv>
        :
        <FullscreenDiv flex={true} flexDirection="row" background="white" justifyContent="center" alignItems="center">
          <Loader size="md" content="Loading" />
        </FullscreenDiv>
      :
      <Router>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/dashboard'} component={Dashboard} />
          <Route path={'/login'} component={Login} />
          <Route path={'/editor'} component={Editor} />
        </Switch>
      </Router>
  )
}

export default App
