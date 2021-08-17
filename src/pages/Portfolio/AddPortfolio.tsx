import { FC, ReactElement } from "react"
import { Button, Modal, Uploader} from "rsuite"

interface props {
  visible: boolean;
  onCancel: () => void;
  onOpen: () => void;
  onSubmit: () => void;
}

const AddPortfolio: FC<props> = ({ visible, onCancel, onOpen, onSubmit }): ReactElement => {
  return (
    <>
      <Button style={{ marginBottom: 8 }} onClick={onOpen} color="green">Tambah Portfolio</Button>
      <Modal show={visible} onHide={onCancel}>
        <Modal.Header>Tambah Portfolio</Modal.Header>
        <Modal.Body>
          <Uploader listType="picture" multiple={false} accept="image/jpeg, image/png, image/jpg" autoUpload={false}>
            <Button>Pilih file gambar</Button>
          </Uploader>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddPortfolio
