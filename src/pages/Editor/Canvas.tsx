import { FC, ReactElement, useRef, useEffect, useState, useCallback, useLayoutEffect, useContext } from "react"
import { Stage, Layer, Rect } from 'react-konva'
import { Button, Divider, FlexboxGrid } from 'rsuite'
import { Transformer } from "konva/lib/shapes/Transformer";
import { Image } from "konva/lib/shapes/Image";
import { CirclePicker } from 'react-color'
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";
import { EditorContext } from ".";
import { baseUrl } from "App";
import CanvasImage from "./CanvasImage";
import DesignImage from "./DesignImage";

const Canvas: FC = (): ReactElement => {
  const trRef = useRef<Transformer>(null);
  const imgRef = useRef<Image>(null);
  const [clothBase, setClothBase] = useState<string>('');
  const [clothBackground, setClothBackground] = useState<string>('');
  const flexBoxRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(500);
  const [preview, togglePreview] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>(['white']);
  const { models: { Color, ClothSide } } = useModels();
  const { errorCatch } = useErrorCatcher();
  const { cloth_id, cloth_sides, cloth_side_id, setClothSide, setClothId, setClothSideId, step, setStep, color, setColor } = useContext(EditorContext);

  const getColors = useCallback(() => {
    Color.collection({
      attributes: ['color'],
    }).then(resp => {
      setColors(resp.rows.map(color => (color.color)));
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, Color]);

  const getFirstClothSide = useCallback(() => {
    if (typeof cloth_id !== 'undefined') {
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
  }, [getFirstClothSide])

  useEffect(() => {
    togglePreview(false);
    // eslint-disable-next-line
  }, [cloth_side_id])

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

  // const canvasScale: number = useMemo(() => {
  //   return Math.min(
  //     canvasSize / 700,
  //     canvasSize / 700
  //   )
  // },[canvasSize])

  return (
    <FlexboxGrid.Item colspan={11}>
      <div ref={flexBoxRef}>
        <Stage width={canvasSize} height={canvasSize}>
          <EditorContext.Provider value={{ cloth_id, cloth_sides, cloth_side_id, setClothSide, setClothId, setClothSideId, step, setStep, color, setColor }}>
            <Layer>
              <Rect width={640} height={800} fill={color} />
              {preview &&
                <>
                  {cloth_sides.filter(side => side.cloth_side_id === cloth_side_id).map(side => (
                    <DesignImage
                      initialX={side.design_x}
                      initialY={side.design_y}
                      key={side.cloth_side_id}
                      src={typeof side.design_file !== 'string' ? URL.createObjectURL(side.design_file) : side.design_file}
                      initialHeight={side.design_height}
                      initialWidth={side.design_width}
                      preview={preview}
                      originalFile={side.design_file}
                    />
                  ))}
                </>}
              <CanvasImage src={clothBase} key={clothBase} globalCompositeOperation="overlay" opacity={0.7} canvasSize={canvasSize} />
              <CanvasImage src={clothBase} globalCompositeOperation="multiply" opacity={0.9} canvasSize={canvasSize} />
              <CanvasImage src={clothBackground} key={clothBackground} canvasSize={canvasSize} />
              {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="overlay" opacity={0.3} image={cloth} /> */}
              {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="multiply" opacity={0.75} image={cloth} /> */}
              {/* <Img width={canvasSize} height={canvasSize} image={background} /> */}
            </Layer>
            {!preview && <Layer>
              {cloth_sides.filter(side => side.cloth_side_id === cloth_side_id).map(side => (
                <DesignImage
                  initialX={side.design_x}
                  initialY={side.design_y}
                  key={side.cloth_side_id}
                  src={URL.createObjectURL(side.design_file)}
                  initialHeight={side.design_height}
                  initialWidth={side.design_width}
                  preview={preview}
                  originalFile={side.design_file}
                />
              ))}
            </Layer>}
          </EditorContext.Provider>
        </Stage>
        <Divider />
        <Button style={{ marginBottom: 8 }} onClick={() => togglePreview(!preview)} appearance="primary" block>{preview ? "Edit Mockup" : `Preview Mockup`}</Button>
        <CirclePicker circleSpacing={20} circleSize={35} width="100%" colors={colors} color={color} onChangeComplete={ev => setColor(ev.hex)} />
      </div>
    </FlexboxGrid.Item>
  )
}

export default Canvas
