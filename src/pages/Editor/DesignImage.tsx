import { FC, ReactElement, useRef, useLayoutEffect, useCallback, useState, useContext, useEffect, useMemo } from "react"
import { Image, Transformer } from 'react-konva'
import { Image as ImageRef } from 'konva/lib/shapes/Image'
import { Transformer as TrRef } from 'konva/lib/shapes/Transformer'
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";
import { EditorContext } from ".";

interface props {
  src: string;
  originalFile: File;
  preview: boolean;
  initialWidth: number;
  initialHeight: number;
  initialX: number;
  initialY: number;
  onLoad?: () => void;
  canvasSize: number;
}

type scaleType = { width: number; height: number };
type positionType = { x: number, y: number }

const DesignImage: FC<props> = ({ src, preview, initialHeight, initialWidth, initialX, initialY, originalFile, onLoad, canvasSize }): ReactElement => {
  const imgRef = useRef<ImageRef>(null);
  const trRef = useRef<TrRef>(null);
  const [image] = useImage(src, 'anonymous');
  const [coords, setCoords] = useState<positionType>({ x: initialX, y: initialY });
  const [scale, setScale] = useState<scaleType>({ width: initialWidth, height: initialHeight });
  const { setClothSide, cloth_side_id } = useContext(EditorContext);

  const relativePosition: positionType = useMemo<positionType>(() => {
    const absX: number = (coords.x / 100) * canvasSize;
    const absY: number = (coords.y / 100) * canvasSize;
    return { x: absX, y: absY };
  }, [coords, canvasSize]);

  const relativeScale: scaleType = useMemo<scaleType>((): scaleType => {
    const absWidth: number = (scale.width / 100) * canvasSize;
    const absHeight: number = (scale.height / 100) * canvasSize;
    return { width: absWidth, height: absHeight };
  }, [scale, canvasSize]);

  const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    const absX: number = e.target.x();
    const absY: number = e.target.y();
    const relativeX = (absX / canvasSize) * 100;
    const relativeY = (absY / canvasSize) * 100;
    setCoords({ x: relativeX, y: relativeY });
    setClothSide!({
      cloth_side_id,
      design_width: scale.width,
      design_height: scale.height,
      design_x: relativeX,
      design_y: relativeY,
      design_file: originalFile,
    });
  }, [cloth_side_id, setClothSide, scale, originalFile, canvasSize]);

  const onTransformEnd = useCallback((e: KonvaEventObject<Event>) => {
    if (imgRef.current !== null) {
      const img = imgRef.current
      const scaleX = img.scaleX();
      const scaleY = img.scaleY();

      const width: number = Math.max(5, img.width() * scaleX);
      const height: number = Math.max(img.height() * scaleY);

      const relativeWidth = (width / canvasSize) * 100;
      const relativeHeight = (height / canvasSize) * 100;

      setClothSide!({
        cloth_side_id,
        design_width: relativeHeight,
        design_height: relativeWidth,
        design_x: coords.x,
        design_y: coords.y,
        design_file: originalFile,
      });
      // we will reset it back
      img.scaleX(1);
      img.scaleY(1);
      setScale({
        width: relativeWidth,
        height: relativeHeight,
      });
    }
  }, [imgRef, coords, cloth_side_id, setClothSide, originalFile, canvasSize]);

  // useEffect(() => {
  // }, [coords, scale, cloth_side_id, src, setClothSide, initialHeight, initialWidth]);

  useLayoutEffect(() => {
    if (trRef.current !== null && imgRef.current !== null && !preview) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [trRef, imgRef, preview]);

  useEffect(() => {
    if (typeof image !== 'undefined') {
      image.onload = () => {
        onLoad && onLoad();
      }
    }
  }, [image, onLoad])

  return (
    preview ?
      <Image draggable image={image} ref={imgRef} {...relativePosition} {...relativeScale} onTransformEnd={onTransformEnd} onDragEnd={onDragEnd} />
      :
      <>
        <Image draggable image={image} ref={imgRef} {...relativePosition} {...relativeScale} onTransformEnd={onTransformEnd} onDragEnd={onDragEnd} />
        <Transformer ref={trRef} />
      </>
  )
}

export default DesignImage
