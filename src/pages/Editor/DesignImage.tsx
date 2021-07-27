import { FC, ReactElement, useRef, useLayoutEffect } from "react"
import { Image, Transformer } from 'react-konva'
import { Image as ImageRef } from 'konva/lib/shapes/Image'
import { Transformer as TrRef } from 'konva/lib/shapes/Transformer'
import useImage from "use-image";

interface props {
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  preview: boolean
}

const DesignImage: FC<props> = ({ src, width, height, x, y, preview }): ReactElement => {
  const imgRef = useRef<ImageRef>(null);
  const trRef = useRef<TrRef>(null);
  const [image] = useImage(src);

  useLayoutEffect(() => {
    if (trRef.current !== null && imgRef.current !== null && !preview) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [trRef, imgRef, preview]);

  return (
    <>
      <Image draggable image={image} ref={imgRef} width={width} height={height} x={x} y={y} />
      <Transformer ref={trRef} />
    </>
  )
}

export default DesignImage
