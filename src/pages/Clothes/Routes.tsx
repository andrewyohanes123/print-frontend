import ClothDetail from "pages/ClothDetail";
import { FC, ReactElement } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import Clothes from "./";

const Routes: FC = (): ReactElement => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact component={Clothes} />
      <Route path={`${path}/:id`} component={ClothDetail} />
    </Switch>
  )
}

export default Routes
