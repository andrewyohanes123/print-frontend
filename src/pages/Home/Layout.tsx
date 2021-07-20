import React, { ReactElement, FC } from 'react'
import Header from './Header'
import Portfolio from './Portfolio'

const Layout: FC = (): ReactElement => {
  return (
    <>
      <Header />
      <Portfolio />
    </>
  )
}

export default Layout
