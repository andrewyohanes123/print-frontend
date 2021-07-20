import React, { FC, ReactElement } from 'react'
import FullscreenDiv, {Header as Head, Logo, SubHeader} from 'components/FullscreenDiv'

const Header: FC = (): ReactElement => {
  return (
    <FullscreenDiv justifyContent="center" alignItems="center" flex flexDirection="column" background="#880061">
      <Logo />
      <Head as="h1">T-Design</Head>
      <SubHeader>Testing</SubHeader>
    </FullscreenDiv>
  )
}

export default Header
