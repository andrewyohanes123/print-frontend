import { FC, ReactElement, useMemo } from "react"
import { List, Pagination, Grid, Row, Col, Panel, IconButton, Icon } from "rsuite"
import { pagination } from "pages/Clothes/ClothList"
import { PortfolioAttributes } from "types"
import Container from "components/Container"
import { baseUrl } from "App"

interface props {
  data: PortfolioAttributes[];
  pagination: pagination;
  onDelete: (portfolio: PortfolioAttributes) => void;
}

const Lists: FC<props> = ({ data, pagination: { limit, onSelect, page, total }, onDelete }): ReactElement => {
  const totalPages: number | undefined = useMemo<number | undefined>(() => {
    if (typeof limit !== 'undefined' && typeof total !== 'undefined') {
      return Math.ceil((total / limit))
    } else {
      return undefined;
    }
  }, [limit, total]);

  return (
    <>
      <List>
        <Grid style={{ paddingTop: 8, paddingBottom: 8 }} fluid>
          <Row>
            {data.map(portfolio => (
              <Col key={`${portfolio.id} ${portfolio.picture}`} md={8}>
                <Panel bodyFill bordered>
                  <img
                    alt={`${portfolio.picture}`}
                    src={`${baseUrl}/public/files/${portfolio.picture}`}
                    className="cloth-display"
                    draggable={false}
                  />
                  <Panel>
                    <IconButton onClick={() => onDelete(portfolio)} icon={<Icon icon="trash-o" />} size="sm" color="red" />
                  </Panel>
                </Panel>
              </Col>
            ))}
          </Row>
        </Grid>
      </List>
      <Container>
        <Pagination onSelect={onSelect} activePage={page} pages={totalPages} ellipsis next prev />
      </Container>
    </>
  )
}

export default Lists
