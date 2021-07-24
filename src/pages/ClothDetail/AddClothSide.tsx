import { FC, ReactElement, useState } from "react"
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Uploader, Icon } from 'rsuite'

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan sisi pakaian')
})

const AddClothSide: FC = (): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Tambah Sisi Pakaian</Button>
      <Modal show={modal} onHide={() => toggleModal(false)}>
        <Modal.Header>Tambah Sisi Pakaian</Modal.Header>
        <Modal.Body>
          <Form model={model} fluid>
            <FormGroup>
              <ControlLabel>Sisi</ControlLabel>
              <FormControl name="name" placeholder="Sisi" />
            </FormGroup>
            <FormGroup>
              <Uploader multiple={false} accept="image/jpeg, image/png, image/jpg" listType="picture" autoUpload={false}>
                <Button><Icon icon="camera" />&nbsp;Gambar Pakaian</Button>        
              </Uploader>
            </FormGroup>
            <FormGroup>
              <Uploader autoUpload={false}>
                <Button><Icon icon="camera" />&nbsp;Background Pakaian</Button>        
              </Uploader>
            </FormGroup>
            <FormGroup>
              <Button ripple={false} appearance="primary" block>Tambah</Button>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddClothSide
