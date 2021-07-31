import { useState, useCallback, useEffect } from "react"
import { Alert, Button, Divider, Row, Col, Grid } from "rsuite"
import { useParams } from "react-router-dom";
import Container from "components/Container"
import AddColorModal from "./AddColorModal";
import useModels from "hooks/useModels";
import { ColorAttributes } from "types";
import useErrorCatcher from "hooks/useErrorCatcher";
import ColorPanel from "./ColorPanel";

const Colors = () => {
  const [colorPicker, toggleColorPicker] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorAttributes[]>([]);
  const [retry, setRetry] = useState<number>(0);
  const { errorCatch } = useErrorCatcher();
  const { models: { Color } } = useModels();
  const { id } = useParams<{ id: string }>();

  const getColors = useCallback(() => {
    Color.collection({
      attributes: ['name', 'color', 'cloth_id'],
      where: {
        cloth_id: id
      }
    }).then(resp => {
      setColors(resp.rows as ColorAttributes[]);
    }).catch(e => {
      errorCatch(e);
      setRetry(attempt => attempt + 1);
    });
  }, [Color, id, errorCatch]);

  useEffect(() => {
    if (retry < 4) {
      getColors();
    }
  }, [getColors, retry]);

  const createColor = useCallback((val: any, cb: () => void) => {
    Color.create({ ...val, cloth_id: id }).then(resp => {
      toggleColorPicker(false);
      Alert.success(`Warna ${resp.name} berhasil ditambah`);
      getColors();
    }).catch(e => {
      errorCatch(e);
    });
  }, [Color, id, getColors, errorCatch]);

  return (
    <Container style={{ marginBottom: 12 }}>
      <Button color="green" onClick={() => toggleColorPicker(true)} >Tambah Warna</Button>
      <AddColorModal onSubmit={createColor} onExit={() => toggleColorPicker(false)} show={colorPicker} />
      <Divider />
      <Grid fluid>
        <Row gutter={8}>
          {
            colors.length > 0 ?
              colors.map(color => (
                <Col sm={6} md={6} key={`${color.id}${color.name}`}>
                  <ColorPanel color={color} />
                </Col>
              ))
              :
              <Col md={24}><p className="secondary-text" style={{ textAlign: 'center' }}>Tidak ada data warna. Silakan tambah data warna</p></Col>
          }
        </Row>
      </Grid>
    </Container>
  )
}

export default Colors
