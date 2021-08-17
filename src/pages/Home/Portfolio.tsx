import { FC, ReactElement, useState, useCallback, useEffect } from 'react'
import { Button, List, Row, Grid, Col, Panel, Placeholder } from 'rsuite'
import Container from 'components/Container'
import { Header } from 'components/FullscreenDiv'
import { PortfolioAttributes } from 'types'
import useModels from 'hooks/useModels'
import useErrorCatcher from 'hooks/useErrorCatcher'
import { baseUrl } from 'App'

const Portfolio: FC = (): ReactElement => {
  const [porfolios, setPortfolios] = useState<PortfolioAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(true);
  const [retry, setRetry] = useState<number>(0);
  const { models: { Portfolio } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getPortfolios = useCallback(() => {
    toggleLoading(true);
    Portfolio.collection({ limit: 8, offset: 0, attributes: ['picture'] }).then(resp => {
      toggleLoading(false);
      setPortfolios(resp.rows as PortfolioAttributes[]);
    }).catch(e => {
      setRetry(retry => retry + 1);
      errorCatch(e);
    });
  }, [errorCatch, Portfolio]);

  useEffect(() => {
    (retry < 4) && getPortfolios();
  }, [getPortfolios, retry]);

  return (
    <>
      <Container>
        <Header textColor="black" fontSize={25} style={{ textAlign: 'center' }} as={'h1'}>Portfolio Kami</Header>
      </Container>
      <List style={{ padding: 8 }}>
        <Grid fluid>
          <Row gutter={16}>
            {
              loading ?
                Array(4).fill(5).map((val, idx) => (
                  <Col key={`${idx}${val}`} md={6}>
                    <Placeholder.Graph active />
                  </Col>
                ))
                :
                porfolios.map(portfolio => (
                  <Col key={portfolio.id.toString()} md={6}>
                    <Panel shaded bodyFill bordered>
                      <img draggable={false} src={`${baseUrl}/public/files/${portfolio.picture}`} className="cloth-display" alt={`${portfolio.id} ${portfolio.picture}`} />
                    </Panel>
                  </Col>
                ))
            }
          </Row>
        </Grid>
      </List>
      <Container>
        <Button block color="blue">Lihat Galeri</Button>
      </Container>
    </>
  )
}

export default Portfolio
