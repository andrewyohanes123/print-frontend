import { FC, ReactElement } from "react"
import {Modal} from 'rsuite'
import { ColorAttributes } from "types"

interface props {
  show?: boolean;
  onHide?: () => void;
  color: ColorAttributes;
}

const ColorSizeStockModal: FC<props> = ({show, onHide, color}): ReactElement => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Stock {color.name}</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

export default ColorSizeStockModal
