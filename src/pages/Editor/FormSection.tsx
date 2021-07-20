import { FC, ReactElement } from "react"
import { Form, FormGroup, FormControl, ControlLabel, FlexboxGrid, Panel, InputGroup, Divider, Button, IconButton, Icon } from 'rsuite'

const FormSection: FC = (): ReactElement => {
  return (
    <FlexboxGrid.Item style={{ marginRight: 12 }} colspan={8}>
      <Panel style={{ marginBottom: 10 }} bordered>
        <IconButton appearance="subtle" icon={<Icon size="lg" icon="angle-left" />} />
        <Divider vertical>Kembali</Divider>
      </Panel>
      <Panel header={<h4>Data Pesanan</h4>} bordered>
        <Form fluid>
          <FormGroup>
            <ControlLabel>Nama</ControlLabel>
            <FormControl placeholder="Nama Lengkap" name="name" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Alamat Email</ControlLabel>
            <FormControl placeholder="Alamat Email" name="email" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nomor Telepon</ControlLabel>
            <FormControl placeholder="Nomor Telepon" name="phone" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Ukuran Design</ControlLabel>
            <InputGroup style={{ width: '100%' }}>
              <FormControl placeholder="Ukuran Tinggi (.cm)" name="design_width" />
              <InputGroup.Addon >x</InputGroup.Addon>
              <FormControl placeholder="Ukuran Lebar (.cm)" name="design_height" />
            </InputGroup>
          </FormGroup>
        <p>Total Harga</p>
        <h4>Rp. 100,000</h4>
        <FormGroup>
          <Divider />
          <Button block appearance="primary">Pesan</Button>
        </FormGroup>
        </Form>
      </Panel>
    </FlexboxGrid.Item>
  )
}

export default FormSection
