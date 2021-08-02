import { ColorDisplayPanel } from "components/ColorDisplayPanel"
import { FC, ReactElement, useContext } from "react"
import { Grid, Row, Col } from 'rsuite'
import { EditorContext } from "."

const CanvasSideSelector: FC = (): ReactElement => {
  const { cloth_sides, cloth_side_id } = useContext(EditorContext);

  return (
    <>
      <Grid fluid>
        <Row gutter={8}>
          {cloth_sides.map(side => (
            <Col key={side.cloth_side_id} md={6}>
              <ColorDisplayPanel className={side.cloth_side_id === cloth_side_id ? "color-display-active" : ''} key={side.cloth_side_id}>
                <img style={{ width: '100%', marginBottom: 8 }} alt={`preview ${side.cloth_side_id}`} src={URL.createObjectURL(side.design_file)} />
                <p>Depan</p>
              </ColorDisplayPanel>
            </Col>
          ))}
        </Row>
      </Grid>
    </>
  )
}

export default CanvasSideSelector
