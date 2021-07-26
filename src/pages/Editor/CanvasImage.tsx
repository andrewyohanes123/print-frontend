import { FC, ReactElement } from "react"
import useImage from 'use-image'
import {Image} from 'react-konva'


interface props {
  src: string;
  canvasSize: number;
  opacity?: number;
  globalCompositeOperation?: any;
} 

const CanvasImage: FC<props> = ({src, canvasSize, opacity, globalCompositeOperation}): ReactElement => {
  const [image] = useImage(src);

  return (
    <Image image={image} width={canvasSize} globalCompositeOperation={globalCompositeOperation} opacity={opacity} height={canvasSize} />
  )
}

export default CanvasImage
