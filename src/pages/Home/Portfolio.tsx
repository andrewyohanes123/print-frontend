import React, { FC, ReactElement } from 'react'
import { Button, Divider } from 'rsuite'
import Container from 'components/Container'
import { Header } from 'components/FullscreenDiv'

const Portfolio: FC = (): ReactElement => {
  return (
    <Container>
      <Header textColor="black" fontSize={35} style={{ textAlign: 'center' }} as={'h1'}>Portfolio Kami</Header>
      <Divider >
      </Divider>
      <Button>Lihat</Button>
    </Container>
  )
}

export default Portfolio
