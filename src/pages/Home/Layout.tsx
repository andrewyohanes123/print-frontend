import { HomeContainer } from 'components/HomeContainer'
import { ReactElement, FC } from 'react'
import { Panel } from 'rsuite'
import AboutUs from './AboutUs'
import Header from './Header'
import HomeFooter from './HomeFooter'
import OrderNow from './OrderNow'
import Portfolio from './Portfolio'

const Layout: FC = (): ReactElement => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Panel className="mt-1 mb-1" bordered>
          <AboutUs />
        </Panel>
        <Panel className="mt-1 mb-1" bordered bodyFill>
          <Portfolio />
        </Panel>
        <Panel className="mb-1" bordered bodyFill>
          <OrderNow />
        </Panel>
      </HomeContainer>
      <HomeFooter />
    </>
  )
}

export default Layout
