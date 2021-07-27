import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { Button, Modal, Form, ControlLabel, FormControl, FormGroup, Schema, InputNumber, InputGroup } from "rsuite"
import { ClothAttributes } from "types";

type formModal = {
  name: string;
  price: number;
}

interface props {
  onSubmit: (val: formModal, cb: () => void) => void;
  cloth?: ClothAttributes;
  onExited?: () => void;
}

const { Types: { StringType } } = Schema;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan jenis kaos')
});

const AddClothModal: FC<props> = ({ onSubmit, cloth, onExited }): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);
  const [values, setValues] = useState<{ name: string, price: number }>({ name: '', price: 50000 });
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

  useEffect(() => {
    if (typeof cloth !== 'undefined') {
      toggleModal(true);
      setValues({ name: cloth.name, price: cloth.price })
    } else {
      setValues({name: '', price: 50000});
    }
  }, [cloth]);

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Tambah Kaos</Button>
      <Modal onExited={onExited} show={modal} onHide={() => toggleModal(false)}>
        {typeof cloth !== 'undefined' ?
          <Modal.Header>Edit Data {cloth.name}</Modal.Header>
          :
          <Modal.Header>Tambah Data Kaos</Modal.Header>
        }
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
                <FormControl type="number" disabled={loading} name="price" placeholder="Harga" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              {cloth ?
                <Button loading={loading} color="green" type="submit">Simpan</Button>
                :
                <Button loading={loading} color="green" type="submit">Tambah</Button>
              }
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddClothModal
