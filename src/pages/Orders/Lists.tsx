import { FC, ReactElement, useMemo } from "react"
import { List, Pagination, Panel } from "rsuite"
import { pagination } from "pages/Clothes/ClothList"
import { OrderAttributes } from "types"
import Container from "components/Container"
import OrderPanel from "./OrderPanel"

interface props {
  data: OrderAttributes[];
  pagination: pagination;
}

const Lists: FC<props> = ({ data, pagination: { page, onSelect, total, limit } }): ReactElement => {

  const totalPages: number | undefined = useMemo<number | undefined>(() => {
    if (typeof limit !== 'undefined' && typeof total !== 'undefined') {
      return Math.ceil((total / limit))
    } else {
      return undefined;
    }
  }, [limit, total]);

  return (
    <>
      {data.length > 0 ?
        <List style={{ padding: 12 }}>
          {
            data.map(order => (
              <OrderPanel key={`${order.id}${order.name}`} order={order} />
            ))
          }
        </List>
        :
        <Container>
          <p className="text-center secondary-text">Tidak ada order</p>
        </Container>
      }
      <Panel>
        <Pagination activePage={page} pages={totalPages} onSelect={onSelect} ellipsis next prev />
      </Panel>
    </>
  )
}

export default Lists
