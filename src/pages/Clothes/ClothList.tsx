import { FC, ReactElement, useMemo } from "react"
import { List, Loader, Pagination, Panel } from "rsuite"
import { Link, useRouteMatch } from 'react-router-dom'
import { ClothAttributes } from "types"
import FullscreenDiv, { Header, SubHeader } from "components/FullscreenDiv";

export type pagination = { total?: number; limit?: number; page?: number; onSelect?: (e: number) => void; };

interface props {
  clothes: ClothAttributes[],
  pagination: pagination;
  loading?: boolean;
}

const ClothList: FC<props> = ({ clothes, pagination: { total, limit, page, onSelect }, loading }): ReactElement => {
  const { path } = useRouteMatch();
  const totalPages: number | undefined = useMemo<number | undefined>(() => {
    if (typeof limit !== 'undefined' && typeof total !== 'undefined') {
      return Math.ceil((total / limit))
    } else {
      return undefined;
    }
  }, [limit, total]);
  // const []
  return (
    <>
      {
        loading ?
          <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
            <Loader size="lg" />
            <Header style={{ color: 'black', fontSize: 30 }} as="h4">Loading</Header>
            <SubHeader style={{ color: '#5f5f5f' }}>Loading data kaos</SubHeader>
          </FullscreenDiv>
          :
          clothes.length > 0 ?
            <>
              <List bordered={false} style={{ marginTop: 10 }}>
                {
                  clothes.map(cloth => (
                    <Panel key={cloth.id} style={{ marginBottom: 10, marginTop: 10 }} bordered>
                      <Link to={`${path}/${cloth.id}`}>{cloth.name}</Link>
                    </Panel>
                  ))
                }
              </List>
              <Pagination size="md" pages={totalPages} ellipsis next prev activePage={page} onSelect={onSelect} />
            </>
            :
            <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
              <Header style={{ color: 'black', fontSize: 30 }} as="h4">Belum ada data kaos</Header>
              <SubHeader style={{ color: '#5f5f5f' }}>Silakan tambah data kaos</SubHeader>
            </FullscreenDiv>
      }
    </>
  )
}

export default ClothList
