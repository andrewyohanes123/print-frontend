import { FC, ReactElement, useState, useCallback } from 'react'
import { Modal, Schema, Form, FormGroup, ControlLabel, FormControl, Button, Divider } from 'rsuite'
import { ChromePicker } from 'react-color'

interface props {
  show?: boolean;
  onExit?: () => void;
  onSubmit: (value: any, cb: () => void) => void;
}

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Masukkan nama warna')
});

const AddColorModal: FC<props> = ({ show, onExit, onSubmit }): ReactElement => {
  const [color, setColor] = useState<string>('white');
  const [formValue, setFormValue] = useState<any>({ name: '' });

  const cb = useCallback(() => {
    setFormValue({ name: '' });
    setColor('white');
  }, [])

  const onFinish = useCallback((valid: boolean) => {
    if (valid) {
      onSubmit({...formValue, color}, cb);
    }
  }, [onSubmit, cb, formValue, color]);

  return (
    <Modal onHide={onExit} show={show}>
      <Modal.Header><Modal.Title>Tambah Warna</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFinish} onChange={setFormValue} fluid model={model}>
          <FormGroup>
            <ControlLabel>Nama Warna</ControlLabel>
            <FormControl placeholder="Nama warna" name="name" />
          </FormGroup>
          <ChromePicker color={color} onChangeComplete={col => setColor(col.hex)} />
          <FormGroup>
            <Divider />
            <Button color="green" type="submit">Tambah</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddColorModal
