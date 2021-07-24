import { FC, ReactElement, useMemo } from "react"
import { List, Panel, Pagination, Grid, Row, Col } from 'rsuite'
import { pagination } from "pages/Clothes/ClothList";
import { ClothSideAttributes } from "types";

interface props {
  sides: ClothSideAttributes[],
  pagination: pagination;
  loading?: boolean;
}

const SideLists: FC<props> = ({ sides, pagination: { page, limit, onSelect, total }, loading }): ReactElement => {
  const totalPages: number | undefined = useMemo<number | undefined>(() => {
    if (typeof limit !== 'undefined' && typeof total !== 'undefined') {
      return Math.ceil(total / limit);
    }
    return undefined;
  }, [limit, total]);
  return (
    <>
      <List>
        <Grid fluid>
          <Row gutter={16}>
            {sides.map(side => (
              <Panel header={side.name}>
                
              </Panel>
            ))}
          </Row>
        </Grid>
      </List>
      <Pagination activePage={page} pages={totalPages} ellipsis next prev onSelect={onSelect} />
    </>
  )
}

export default SideLists;