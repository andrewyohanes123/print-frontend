import { FC, ReactElement, useRef, useLayoutEffect, useCallback, useState, useContext, useEffect } from "react"
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
}

const DesignImage: FC<props> = ({ src, preview, initialHeight, initialWidth, initialX, initialY, originalFile, onLoad }): ReactElement => {
  const imgRef = useRef<ImageRef>(null);
  const trRef = useRef<TrRef>(null);
  const [image] = useImage(src, 'anonymous');
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: initialX, y: initialY });
  const [scale, setScale] = useState<{ width: number; height: number }>({ width: initialWidth, height: initialHeight });
  const { setClothSide, cloth_side_id } = useContext(EditorContext)

  const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => {
    setCoords({ x: e.target.x(), y: e.target.y() });
    setClothSide!({
      cloth_side_id,
      design_width: scale.width,
      design_height: scale.height,
      design_x: e.target.x(),
      design_y: e.target.y(),
      design_file: originalFile,
    });
  }, [cloth_side_id, setClothSide, scale, originalFile]);

  const onTransformEnd = useCallback((e: KonvaEventObject<Event>) => {
    if (imgRef.current !== null) {
      const img = imgRef.current
      const scaleX = img.scaleX();
      const scaleY = img.scaleY();

      const width: number = Math.max(5, img.width() * scaleX);
      const height: number = Math.max(img.height() * scaleY);

      setClothSide!({
        cloth_side_id,
        design_width: width,
        design_height: height,
        design_x: coords.x,
        design_y: coords.y,
        design_file: originalFile,
      });
      // we will reset it back
      img.scaleX(1);
      img.scaleY(1);
      setScale({
        width,
        height,
      });
    }
  }, [imgRef, coords, cloth_side_id, setClothSide, originalFile]);

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
      <Image draggable image={image} ref={imgRef} {...coords} {...scale} onTransformEnd={onTransformEnd} onDragEnd={onDragEnd} />
      :
      <>
        <Image draggable image={image} ref={imgRef} {...coords} {...scale} onTransformEnd={onTransformEnd} onDragEnd={onDragEnd} />
        <Transformer ref={trRef} />
      </>
  )
}

export default DesignImage
