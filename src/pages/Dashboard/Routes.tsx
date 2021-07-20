import { FC, ReactElement, lazy, Suspense } from 'react'
import {Loader} from 'rsuite'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import FullscreenDiv, { Header, SubHeader } from 'components/FullscreenDiv';

const Clothes = lazy(() => import('../Clothes'));
const DashboardHomePage = lazy(() => import('../DashboardHomePage'));
const Orders = lazy(() => import('../Orders'));

const Routes: FC = (): ReactElement => {
  const { path } = useRouteMatch();
  return (
    <Suspense fallback={<FullscreenDiv background="white" flex={true} flexDirection="row" justifyContent="center" alignItems="center">
      <Header>Loading</Header>
      <SubHeader>Memuat halaman</SubHeader>
      <Loader size="md" />
    </FullscreenDiv>}>
      <Switch>
        <Route path={`${path}`} exact component={DashboardHomePage} />
        <Route path={`${path}/order`} component={Orders} />
        <Route path={`${path}/kaos`} component={Clothes} />
      </Switch>
    </Suspense>
  )
}

export default Routes
