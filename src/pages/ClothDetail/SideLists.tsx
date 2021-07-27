import { FC, ReactElement } from "react"
import { List, Panel, Grid, Row, Col, IconButton, Icon, Divider, Tooltip, Whisper, Button } from 'rsuite'
import { ClothSideAttributes } from "types";
import { baseUrl } from "App";
import Loading from "components/Loading";
import FullscreenDiv from "components/FullscreenDiv";

interface props {
  sides: ClothSideAttributes[],
  loading?: boolean;
  onAddSide?: () => void;
  onDelete?: (side: ClothSideAttributes) => void;
}

const SideLists: FC<props> = ({ sides, loading, onAddSide, onDelete }): ReactElement => {
  return (
    loading ?
      <Loading />
      :
      <>
        {
          sides.length > 0 ?
            <List style={{ marginTop: 8 }} bordered={false}>
              <Grid fluid>
                <Row gutter={16}>
                  {sides.map(side => (
                    <Col md={6} key={side.id}>
                      <Panel style={{ marginBottom: 5, marginTop: 5 }} bodyFill bordered>
                        <img className="cloth-display" style={{ width: '100%' }} src={`${baseUrl}/public/files/${side.cloth_base}`} alt={side.name} />
                        <Panel>
                          <h5>{side.name}</h5>
                          <p className="secondary-text mb-2"><small>{side.cloth.name}</small></p>
                          <Whisper placement="top" trigger="hover" speaker={<Tooltip>Edit {side.name}</Tooltip>}>
                            <IconButton color="orange" icon={<Icon icon="edit2" />} />
                          </Whisper>
                          <Divider vertical />
                          <Whisper placement="topEnd" trigger="hover" speaker={<Tooltip>Hapus {side.name}</Tooltip>}>
                            <IconButton onClick={() => onDelete ? onDelete(side) : console.log('object')} color="red" icon={<Icon icon="trash" />} />
                          </Whisper>
                        </Panel>
                      </Panel>
                    </Col>
                  ))}
                </Row>
              </Grid>
            </List>
            :
            <FullscreenDiv flex={true} flexDirection="column" background="white" justifyContent="center" alignItems="center">
              <Icon icon="suitcase" size="5x" />
              <h3 style={{ marginBottom: 8 }}>Data sisi pakaian kosong</h3>
              <Button onClick={onAddSide} color="green"><Icon icon="plus-circle" />&nbsp;Tambah Data</Button>
            </FullscreenDiv>
        }
      </>
  )
}

export default SideLists;