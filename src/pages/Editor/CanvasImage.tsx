import { FC, ReactElement, useLayoutEffect } from "react"
import useImage from 'use-image'
import { Image as Img } from 'react-konva'


interface props {
  src: string;
  canvasSize: number;
  opacity?: number;
  globalCompositeOperation?: any;
  onLoad?: () => void;
}

const CanvasImage: FC<props> = ({ src, canvasSize, opacity, globalCompositeOperation, onLoad }): ReactElement => {
  const [image] = useImage(src, 'anonymous');

  useLayoutEffect(() => {
    if (typeof image !== 'undefined') {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        onLoad && onLoad();
        console.log('loaded')
      }
    }
  }, [image, onLoad, src]);

  return (
    <Img image={image} width={canvasSize} globalCompositeOperation={globalCompositeOperation} opacity={opacity} height={canvasSize} />
  )
}

export default CanvasImage
