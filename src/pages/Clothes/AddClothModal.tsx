import { FC, ReactElement, useState, useCallback } from "react"
import { Button, Modal, Form, ControlLabel, FormControl, FormGroup, Schema, InputNumber, InputGroup } from "rsuite"

type formModal = {
  name: string;
  price: number;
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
  const [values, setValues] = useState<{ 'name': '', price: number }>({ name: '', price: 50000 });
  const [loading, toggleLoading] = useState<boolean>(false);

  const cleanUp = useCallback(() => {
    setValues({ name: '', price: 50000 });
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
              <ControlLabel>Jenis Pakaian</ControlLabel>
              <FormControl disabled={loading} name="name" placeholder="Jenis Pakaian" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Harga</ControlLabel>
              <InputGroup style={{ width: '100%' }}>
                <InputGroup.Addon>Rp.</InputGroup.Addon>
                <InputNumber style={{ width: '100%' }} min={1000} disabled={loading} name="price" placeholder="Harga" />
              </InputGroup>
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
