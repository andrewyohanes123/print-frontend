import FullscreenDiv, { Header, SubHeader } from "components/FullscreenDiv";
import { FC, ReactElement, lazy, Suspense } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { Loader } from "rsuite";

const Orders = lazy(() => import("."));
const OrderDetail = lazy(() => import("pages/OrderDetail/index"));

const Routes: FC = (): ReactElement => {
  const { path } = useRouteMatch();

  return (
    <Suspense fallback={<FullscreenDiv background="white" flex={true} flexDirection="row" justifyContent="center" alignItems="center">
      <Header>Loading</Header>
      <SubHeader>Memuat halaman</SubHeader>
      <Loader size="md" />
    </FullscreenDiv>}>
      <Switch>
        <Route path={`${path}`} exact component={Orders} />
        <Route path={`${path}/detail/:id`} exact component={OrderDetail} />
      </Switch>
    </Suspense>
  )
}

export default Routes
