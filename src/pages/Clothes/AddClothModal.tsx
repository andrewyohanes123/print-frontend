import { FC, ReactElement, useState, useCallback } from "react"
import { Button, Modal, Form, ControlLabel, FormControl, FormGroup, Schema } from "rsuite"

type formModal = {
  name: string;
}

interface props {
  onSubmit: (val: formModal, cb: () => void) => void;
}

const { Types: { StringType } } = Schema;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan jenis kaos')
});

const AddClothModal: FC<props> = ({ onSubmit }): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);
  const [values, setValues] = useState<{ 'name': '' }>({ name: '' });
  const [loading, toggleLoading] = useState<boolean>(false);

  const cleanUp = useCallback(() => {
    setValues({ name: '' });
    toggleLoading(false);
    toggleModal(false);
  }, []);

  const onFinish = useCallback((valid: boolean) => {
    toggleLoading(true);
    if (valid) {
      onSubmit(values, cleanUp);
    }
  }, [values, onSubmit, cleanUp]);

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Tambah Kaos</Button>
      <Modal show={modal} onHide={() => toggleModal(false)}>
        <Modal.Header>Tambah Data Kaos</Modal.Header>
        <Modal.Body>
          {/* @ts-ignore */}
          <Form onSubmit={onFinish} formValue={values} onChange={e => setValues({ ...e })} model={model} fluid>
            <FormGroup>
              <ControlLabel>Jenis Kaos</ControlLabel>
              <FormControl disabled={loading} name="name" placeholder="Jenis Kaos" />
            </FormGroup>
            <FormGroup>
              <Button loading={loading} type="submit">Tambah</Button>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddClothModal
