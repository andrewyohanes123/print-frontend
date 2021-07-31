import { FC, ReactElement, useMemo } from "react"
import { List, Loader, Pagination, Panel, FlexboxGrid, Icon, IconButton, Divider, Whisper, Tooltip } from "rsuite"
import { Link, useRouteMatch } from 'react-router-dom'
import { ClothAttributes } from "types"
import FullscreenDiv, { Header, SubHeader } from "components/FullscreenDiv";

export type pagination = { total?: number; limit?: number; page?: number; onSelect?: (e: number) => void; };

interface props {
  clothes: ClothAttributes[],
  pagination: pagination;
  loading?: boolean;
  onEdit: (cloth: ClothAttributes) => void;
}

const ClothList: FC<props> = ({ clothes, pagination: { total, limit, page, onSelect }, loading, onEdit }): ReactElement => {
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
            <SubHeader style={{ color: '#5f5f5f' }}>Loading data pakaian</SubHeader>
          </FullscreenDiv>
          :
          clothes.length > 0 ?
            <>
              <List bordered={false} style={{ marginTop: 10 }}>
                {
                  clothes.map(cloth => (
                    <Panel key={cloth.id} style={{ marginBottom: 10, marginTop: 10 }} bordered>
                      <FlexboxGrid align="middle" justify='space-between'>
                        <FlexboxGrid.Item colspan={16}>
                          <h4><Link to={`${path}/${cloth.id}`}>{cloth.name}</Link></h4>
                          <p><small>Rp. {cloth.price}</small></p>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={2}>
                          <Whisper placement="top" speaker={<Tooltip>Edit {cloth.name}</Tooltip>}>
                            <IconButton onClick={() => onEdit(cloth)} size="sm" color="orange" icon={<Icon icon="edit2" />} />
                          </Whisper>
                          <Divider vertical />
                          <Whisper placement="topEnd" speaker={<Tooltip>Hapus {cloth.name}</Tooltip>}>
                            <IconButton size="sm" color="red" icon={<Icon icon="trash" />} />
                          </Whisper>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </Panel>
                  ))
                }
              </List>
              <Pagination size="md" pages={totalPages} ellipsis next prev activePage={page} onSelect={onSelect} />
            </>
            :
            <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
              <Header style={{ color: 'black', fontSize: 30 }} as="h4">Belum ada data pakaian</Header>
              <SubHeader style={{ color: '#5f5f5f' }}>Silakan tambah data pakaian</SubHeader>
            </FullscreenDiv>
      }
    </>
  )
}

export default ClothList
