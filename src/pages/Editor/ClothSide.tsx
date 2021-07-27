import { FC, ReactElement, useCallback, useContext, useEffect, useState } from "react"
import { List, Panel, Row, Grid, Col } from "rsuite"
import Loading from "components/Loading";
import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels"
import { ClothSideAttributes, RawClothSideAttributes } from "types";
import { EditorContext } from ".";
import ClothSidePanel from "./ClothSidePanel";

const ClothSide: FC = (): ReactElement => {
  const { models: { ClothSide, Cloth } } = useModels();
  const [sides, setSides] = useState<RawClothSideAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(true);
  const { errorCatch } = useErrorCatcher();
  const { cloth_id, setClothSideId } = useContext(EditorContext);
  const [clothName, setClothName] = useState<string>('');

  const getSides = useCallback(() => {
    toggleLoading(true);
    ClothSide.collection({
      attributes: ['name', 'cloth_base'],
      where: {
        cloth_id
      }
    }).then(resp => {
      toggleLoading(false);
      setSides((resp.rows as ClothSideAttributes[]).map(({ name, id, cloth_base, cloth_background }: RawClothSideAttributes) => ({ name, id, cloth_background, cloth_base })))
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, ClothSide, cloth_id]);

  const getClothName = useCallback(() => {
    Cloth.single(cloth_id!).then(resp => {
      setClothName(resp.name);
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, Cloth, cloth_id])

  useEffect(() => {
    getSides();
    getClothName();
  }, [getSides, getClothName]);

  useEffect(() => {
    if (clothName.length > 0) document.title = `T-Design (Editor) | ${clothName}`
  }, [clothName])

  useEffect(() => {
    if (sides.length > 0) setClothSideId(sides[0].id);
  }, [sides, setClothSideId])

  return (
    <Panel bodyFill header={<h5>Pilih Sisi {clothName}</h5>} bordered>
      {loading ?
        <Loading />
        :
        <List>
          <Grid style={{ padding: 8 }}>
            <Row gutter={16}>
              {sides.map((side, idx) => (
                <Col md={6} key={side.id}>
                  <ClothSidePanel onClick={() => setClothSideId(side.id)} idx={idx} side={side} />
                </Col>
              ))}
            </Row>
          </Grid>
        </List>
      }
    </Panel>
  )
}

export default ClothSide
