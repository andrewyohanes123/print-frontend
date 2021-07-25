import { FC, ReactElement, useRef, useEffect, useState, useCallback } from "react"
import { Stage, Layer, Image as Img, Rect, Transformer as Tr } from 'react-konva'
import { Button, Divider, FlexboxGrid } from 'rsuite'
import useImage from "use-image";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Image } from "konva/lib/shapes/Image";
import { CirclePicker } from 'react-color'
import front from 'assets/front.png';
import bg from 'assets/background-front.png';
import logo from 'assets/coffee.png'
import { KonvaEventObject } from "konva/lib/Node";
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";

const Canvas: FC = (): ReactElement => {
  const [cloth] = useImage(front);
  const [background] = useImage(bg);
  const [coffee] = useImage(logo);
  const trRef = useRef<Transformer>(null);
  const imgRef = useRef<Image>(null);
  const [clothColor, setClothColor] = useState<string>('white');
  const [preview, togglePreview] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<{ width: number; height: number }>({ width: 400, height: 400 });
  const [colors, setColors] = useState<string[]>(['white']);
  const { models: { Color } } = useModels();
  const {errorCatch} = useErrorCatcher();

  const getColors = useCallback(() => {
    Color.collection({
      attributes: ['color'],
    }).then(resp => {
      setColors(resp.rows.map(color => (color.color)));
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, Color]);

  useEffect(() => {
    getColors();
  }, [getColors]);

  useEffect(() => {
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

  return (
    <FlexboxGrid.Item colspan={11}>
      <Stage width={640} height={800}>
        <Layer>
          <Rect width={640} height={800} fill={clothColor} />
          {preview &&
            <>
              <Img draggable {...coords} image={coffee} {...scale} />
            </>}
          <Img width={640} height={800} globalCompositeOperation="overlay" opacity={0.3} image={cloth} />
          <Img width={640} height={800} globalCompositeOperation="multiply" opacity={0.75} image={cloth} />
          <Img width={640} height={800} image={background} />
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
    </FlexboxGrid.Item>
  )
}

export default Canvas
