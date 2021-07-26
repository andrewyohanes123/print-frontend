import { FC, ReactElement, useRef, useEffect, useState, useCallback, useLayoutEffect, useContext } from "react"
import { Stage, Layer, Image as Img, Rect, Transformer as Tr } from 'react-konva'
import { Button, Divider, FlexboxGrid } from 'rsuite'
import useImage from "use-image";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Image } from "konva/lib/shapes/Image";
import { CirclePicker } from 'react-color'
import logo from 'assets/coffee.png'
import { KonvaEventObject } from "konva/lib/Node";
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";
import { EditorContext } from ".";
import { baseUrl } from "App";
import CanvasImage from "./CanvasImage";

const Canvas: FC = (): ReactElement => {
  const [coffee] = useImage(logo);
  const trRef = useRef<Transformer>(null);
  const imgRef = useRef<Image>(null);
  const [clothBase, setClothBase] = useState<string>('');
  const [clothBackground, setClothBackground] = useState<string>('');
  const flexBoxRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(500);
  const [clothColor, setClothColor] = useState<string>('white');
  const [preview, togglePreview] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<{ width: number; height: number }>({ width: 400, height: 400 });
  const [colors, setColors] = useState<string[]>(['white']);
  const { models: { Color, ClothSide } } = useModels();
  const { errorCatch } = useErrorCatcher();
  const { cloth_id } = useContext(EditorContext);

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
          cloth_id
        }
      }).then(resp => {
        const [side] = resp.rows;
        setClothBase(`${baseUrl}/public/files/${side.cloth_base}`);
        setClothBackground(`${baseUrl}/public/files/${side.cloth_background}`);
      }).catch(e => {
        errorCatch(e);
      })
    }
  }, [cloth_id, errorCatch]);

  useEffect(() => {
    getFirstClothSide();
  }, [getFirstClothSide])

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

  const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    setCoords({ x: e.target.x(), y: e.target.y() });
  }, []);

  const onTransformEnd = useCallback((e: KonvaEventObject<Event>) => {
    if (imgRef.current !== null) {
      const img = imgRef.current
      const scaleX = img.scaleX();
      const scaleY = img.scaleY();

      // we will reset it back
      img.scaleX(1);
      img.scaleY(1);
      setScale({
        width: Math.max(5, img.width() * scaleX),
        height: Math.max(img.height() * scaleY),
      });
    }
  }, [imgRef]);

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
          <Layer>
            <Rect width={640} height={800} fill={clothColor} />
            {preview &&
              <>
                <Img draggable {...coords} image={coffee} {...scale} />
              </>}
            <CanvasImage src={clothBase} key={clothBase} globalCompositeOperation="overlay" opacity={0.45} canvasSize={canvasSize} />
            <CanvasImage src={clothBase} globalCompositeOperation="multiply" opacity={0.8} canvasSize={canvasSize} />
            <CanvasImage src={clothBackground} key={clothBackground} canvasSize={canvasSize} />
            {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="overlay" opacity={0.3} image={cloth} /> */}
            {/* <Img width={canvasSize} height={canvasSize} globalCompositeOperation="multiply" opacity={0.75} image={cloth} /> */}
            {/* <Img width={canvasSize} height={canvasSize} image={background} /> */}
          </Layer>
          {!preview && <Layer>
            <>
              <Img draggable onDragEnd={onDragEnd} onTransformEnd={onTransformEnd} ref={imgRef} image={coffee} {...coords} {...scale} />
              <Tr ref={trRef} />
            </>
          </Layer>}
        </Stage>
        <Divider />
        <Button style={{ marginBottom: 8 }} onClick={() => togglePreview(!preview)} appearance="primary" block>{preview ? "Edit Mockup" : `Preview Mockup`}</Button>
        <CirclePicker circleSpacing={20} circleSize={35} width="100%" colors={colors} color={clothColor} onChangeComplete={ev => setClothColor(ev.hex)} />
      </div>
    </FlexboxGrid.Item>
  )
}

export default Canvas
