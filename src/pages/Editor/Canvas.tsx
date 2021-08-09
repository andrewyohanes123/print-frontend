import { FC, ReactElement, useRef, useEffect, useState, useCallback, useLayoutEffect, useContext } from "react"
import { Stage, Layer, Rect, Text } from 'react-konva'
import { Button, Divider, Grid, Row, Col } from 'rsuite'
import { Transformer } from "konva/lib/shapes/Transformer";
import { Image } from "konva/lib/shapes/Image";
import { Stage as StageInstance } from "konva/lib/Stage";
import {saveAs} from 'file-saver'
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";
import { EditorContext } from ".";
import { baseUrl } from "App";
import CanvasImage from "./CanvasImage";
import DesignImage from "./DesignImage";
import { ColorAttributes } from "types";
import { ColorDisplay } from "components/ColorDisplay";
import { ColorDisplayPanel } from "components/ColorDisplayPanel";
import CanvasSideSelector from "./CanvasSideSelector";

interface props {
  preview?: boolean;
}

const Canvas: FC<props> = ({preview: previewCanvas}): ReactElement => {
  const trRef = useRef<Transformer>(null);
  const imgRef = useRef<Image>(null);
  const stageRef = useRef<StageInstance>(null);
  const [clothBase, setClothBase] = useState<string>('');
  const [clothBackground, setClothBackground] = useState<string>('');
  const flexBoxRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(500);
  const [preview, togglePreview] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { models: { Color, ClothSide } } = useModels();
  const { errorCatch } = useErrorCatcher();
  const {
    cloth_id,
    cloth_sides,
    cloth_side_id,
    setClothSide,
    setClothId,
    setClothSideId,
    step,
    setStep,
    color,
    setColor,
    setColorId,
    color_id,
    orderSuccess,
    ...rest } = useContext(EditorContext);

  const getColors = useCallback(() => {
    Color.collection({
      attributes: ['color', 'name', 'cloth_id'],
      where: {
        cloth_id
      }
    }).then(resp => {
      setColors(resp.rows as ColorAttributes[]);
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, Color, cloth_id]);

  const getFirstClothSide = useCallback(() => {
    if (typeof cloth_id !== 'undefined') {
      toggleLoading(true);
      ClothSide.collection({
        limit: 1,
        attributes: ['cloth_base', 'cloth_background', 'cloth_id'],
        where: {
          cloth_id,
          id: cloth_side_id
        }
      }).then(resp => {
        const [side] = resp.rows;
        setClothBase(`${baseUrl}/public/files/${side.cloth_base}`);
        setClothBackground(`${baseUrl}/public/files/${side.cloth_background}`);
      }).catch(e => {
        errorCatch(e);
      })
    }
  }, [cloth_id, errorCatch, cloth_side_id, ClothSide]);

  useEffect(() => {
    getFirstClothSide();
  }, [getFirstClothSide]);

  useEffect(() => {
    typeof previewCanvas !== 'undefined' && togglePreview(true);
  }, [previewCanvas]);

  useEffect(() => {
    togglePreview(step >= 2);
    getFirstClothSide();
    // eslint-disable-next-line
  }, [cloth_side_id, step]);

  useEffect(() => {
    getColors();
  }, [getColors]);

  useLayoutEffect(() => {
    if (flexBoxRef.current !== null) {
      setCanvasSize(flexBoxRef.current.clientWidth);
      // console.log(flexBoxRef.current.clientWidth)
    }
  }, [flexBoxRef])

  useLayoutEffect(() => {
    if (trRef.current !== null && imgRef.current !== null && !preview) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [trRef, imgRef, preview]);

  useEffect(() => {
    if (step >= 2) {
      togglePreview(true);
    }
  }, [step])

  const savePicture = useCallback(() => {
    if (stageRef.current !== null) {
      const link = stageRef.current.toDataURL({ pixelRatio: 2, });
      // console.log(link)
      saveAs(link, `Mockup Design ${cloth_side_id}.png`);
    }
  }, [stageRef, cloth_side_id])

  return (    
      <div ref={flexBoxRef}>
        <Stage ref={stageRef} width={canvasSize} height={canvasSize}>
          <EditorContext.Provider value={{ cloth_id, cloth_sides, cloth_side_id, setClothSide, setClothId, setClothSideId, step, setStep, color, setColor, setColorId, color_id, ...rest }}>
            <Layer key="base_layer">
              <Rect width={canvasSize} height={canvasSize} fill={loading ? 'white' : color} />
              {preview &&
                <>
                  {cloth_sides.filter(side => side.cloth_side_id === cloth_side_id).map(side => (
                    <DesignImage
                      initialX={side.design_x}
                      initialY={side.design_y}
                      key={`${side.cloth_side_id}${clothBase}`}
                      src={typeof side.design_file !== 'string' ? URL.createObjectURL(side.design_file) : side.design_file}
                      initialHeight={side.design_height}
                      initialWidth={side.design_width}
                      preview={preview}
                      originalFile={side.design_file as File}
                      canvasSize={canvasSize}
                    />
                  ))}
                </>}
              <CanvasImage src={clothBase} key={clothBase} globalCompositeOperation="overlay" opacity={0.8} canvasSize={canvasSize} />
              <CanvasImage src={clothBase} key={`multiply${clothBase}`} globalCompositeOperation="multiply" opacity={0.9} onLoad={() => toggleLoading(false)} canvasSize={canvasSize} />
              <CanvasImage src={clothBackground} key={clothBackground} canvasSize={canvasSize} />
              {loading && <Text text="Loading gambar pakaian" x={canvasSize / 2} y={canvasSize / 2} />}
              {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="overlay" opacity={0.3} image={cloth} /> */}
              {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="multiply" opacity={0.75} image={cloth} /> */}
              {/* <Img width={canvasSize} height={canvasSize} image={background} /> */}
            </Layer>
            {!preview && <Layer key="design_layer">
              {cloth_sides.filter(side => side.cloth_side_id === cloth_side_id).map(side => (
                <DesignImage
                  initialX={side.design_x}
                  initialY={side.design_y}
                  key={`${side.cloth_side_id}${clothBackground}`}
                  src={typeof side.design_file !== 'string' ? URL.createObjectURL(side.design_file) : side.design_file}
                  initialHeight={side.design_height}
                  initialWidth={side.design_width}
                  preview={preview}
                  originalFile={side.design_file as File}
                  canvasSize={canvasSize}
                />
              ))}
            </Layer>}
          </EditorContext.Provider>
        </Stage>
        <Divider />
        {step < 2 &&
          <>
            <Button style={{ marginBottom: 8 }} onClick={() => togglePreview(!preview)} appearance="primary" block>{preview ? "Edit Mockup" : `Preview Mockup`}</Button>
            <Grid fluid>
              <Row gutter={6}>
                {
                  colors.map(clr => (
                    <Col sm={4} md={4} key={`${clr.id}-${clr.name}`}>
                      <ColorDisplayPanel onClick={() => {
                        setColor(clr.color);
                        setColorId(clr.id)
                      }} className={color === clr.color ? 'color-display-active' : ''}>
                        <ColorDisplay size={30} backgroundColor={clr.color} />
                        <p style={{ textAlign: 'center' }}>{clr.name}</p>
                      </ColorDisplayPanel>
                    </Col>
                  ))
                }
              </Row>
            </Grid>
          </>}
        {step === 3 &&
          <Button color="blue" onClick={savePicture} style={{ marginBottom: 8 }} block>Simpan gambar</Button>
        }
        {
          step >= 2 &&
          <CanvasSideSelector />
        }
      </div>
  )
}

export default Canvas
