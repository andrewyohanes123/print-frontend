import { FC, ReactElement, useCallback, useState } from "react"
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Uploader, Icon, Message } from 'rsuite'
import { FileType } from "rsuite/lib/Uploader";
import { ClothSideAttributes } from "types";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan sisi pakaian')
})

interface props {
  onSubmit: (vales: any, cb: () => void) => void;
  clothSide?: ClothSideAttributes;
}

const AddClothSide: FC<props> = ({ onSubmit }): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);
  const [clothBase, setClothBase] = useState<FileType[]>([]);
  const [clothBackground, setClothBackground] = useState<FileType[]>([]);
  const [formValues, setFormValues] = useState<any>({ name: '' });
  const [loading, toggleLoading] = useState<boolean>(false);


  const onSelectBase = useCallback((e: FileType[]) => {
    const [file] = e;
    setClothBase([file]);
  }, []);

  const onSelectBackground = useCallback((e: FileType[]) => {
    const [file] = e;
    setClothBackground([file]);
  }, []);

  const resetForm = useCallback(() => {
    setFormValues({ name: '' });
    setClothBackground([]);
    setClothBase([]);
    toggleLoading(false);
    toggleModal(false);
  }, []);

  const onFinish = useCallback((valid: boolean) => {
    console.log(valid)
    toggleLoading(true);
    const clothBaseValid = clothBase.length > 0;
    const clothBackgroundValid = clothBackground.length > 0;
    if (valid && clothBackgroundValid && clothBaseValid) {
      onSubmit({ ...formValues, cloth_base: clothBase[0], cloth_background: clothBackground[0] }, resetForm);
    }
  }, [clothBackground, clothBase, onSubmit, resetForm, formValues]);

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Tambah Sisi Pakaian</Button>
      <Modal show={modal} onHide={() => toggleModal(false)}>
        <Modal.Header>Tambah Sisi Pakaian</Modal.Header>
        <Modal.Body>
          <Form checkTrigger="change" onSubmit={onFinish} onChange={setFormValues} model={model} fluid>
            <FormGroup>
              <ControlLabel>Sisi</ControlLabel>
              <FormControl disabled={loading} name="name" placeholder="Sisi" />
            </FormGroup>
            <FormGroup>
              <Uploader
                name="cloth_base"
                fileList={clothBase}
                onChange={onSelectBase}
                multiple={false}
                accept="image/png" listType="picture-text" autoUpload={false}>
                <Button disabled={loading} loading={loading}><Icon icon="camera" />&nbsp;Gambar Pakaian</Button>
              </Uploader>
            </FormGroup>
            <FormGroup>
              <Uploader
                name="cloth_background"
                fileList={clothBackground}
                onChange={onSelectBackground}
                multiple={false}
                accept="image/png"
                listType="picture-text"
                autoUpload={false}
              >
                <Button disabled={loading} loading={loading}><Icon icon="camera" />&nbsp;Background Pakaian</Button>
              </Uploader>
            </FormGroup>
            <FormGroup>
              <Button disabled={loading} type="submit" loading={loading} ripple={false} appearance="primary" block>Tambah</Button>
            </FormGroup>
          </Form>
          {loading && <Message type="info" title="Mengunggah" description="Sedang mengunggah gambar pakaian. Harap tunggu..." />}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddClothSide
