import { FC, ReactElement, useCallback, useState } from "react"
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Uploader, Icon } from 'rsuite'
import { FileType } from "rsuite/lib/Uploader";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan sisi pakaian')
})

const AddClothSide: FC = (): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);
  const [clothBase, setClothBase] = useState<FileType[]>([]);
  const [clothBackground, setClothBackground] = useState<FileType[]>([]);

  const onSelectBase = useCallback((e: FileType[]) => {
    const [file] = e;
    setClothBase([file]);
  }, []);

  const onSelectBackground = useCallback((e: FileType[]) => {
    const [file] = e;
    setClothBackground([file]);
  }, [])

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Tambah Sisi Pakaian</Button>
      <Modal show={modal} onHide={() => toggleModal(false)}>
        <Modal.Header>Tambah Sisi Pakaian</Modal.Header>
        <Modal.Body>
          <Form checkTrigger="change" onChange={e => console.log(e)} model={model} fluid>
            <FormGroup>
              <ControlLabel>Sisi</ControlLabel>
              <FormControl name="name" placeholder="Sisi" />
            </FormGroup>
            <FormGroup>
              <Uploader
                name="cloth_base"
                fileList={clothBase}
                onChange={onSelectBase}
                multiple={false}
                accept="image/jpeg, image/png, image/jpg" listType="picture-text" autoUpload={false}>
                <Button><Icon icon="camera" />&nbsp;Gambar Pakaian</Button>
              </Uploader>
            </FormGroup>
            <FormGroup>
              <Uploader
                name="cloth_background"
                fileList={clothBackground}
                onChange={onSelectBackground}
                multiple={false}
                accept="image/jpeg, image/png, image/jpg"
                listType="picture-text"
                autoUpload={false}
              >
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
