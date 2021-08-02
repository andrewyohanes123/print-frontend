import { FC, ReactElement, useState, useEffect, useContext, useCallback, useMemo } from "react"
import { Form, FormGroup, FormControl, ControlLabel, Panel, Divider, Button, Schema, Toggle } from 'rsuite'
import useModels from "hooks/useModels"
import { EditorContext } from ".";
import ClothSize, { OrderAmount } from "./ClothSize";
// import { RawOrderCountAttributes, SizeAttributes } from "types";

// const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const { StringType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Masukkan nama lengkap').minLength(4, 'Masukkan nama lebih dari 4 karakter'),
  email: StringType().isEmail('Masukkan alamat email yang valid').isRequired('Masukkan alamat email'),
  phone: StringType().isRequired('Masukkan nomor telepon')
});

const FormSection: FC = (): ReactElement => {
  const { models: { Cloth, } } = useModels();
  const { cloth_id, cloth_sides } = useContext(EditorContext);
  const [price, setPrice] = useState<number>(100);
  const [retry, setRetry] = useState<number>(0);
  const [formValues, setFormValues] = useState<{[any: string]: any}>({});
  const [orderAmount, setOrderAmount] = useState<OrderAmount[]>([]);
  // const [sizes, setSizes] = useState<SizeAttributes[]>([]);

  const getClothPrice = useCallback(() => {
    if (typeof cloth_id !== 'undefined') {
      Cloth.single(cloth_id).then(resp => {
        setPrice(resp.price);
      }).catch(e => {
        console.log(e);
        setRetry(count => count + 1);
      })
    }
  }, [Cloth, cloth_id, setRetry]);

  useEffect(() => {
    (retry < 4) && getClothPrice();
  }, [retry, getClothPrice]);

  const designPrice: number = useMemo<number>(() => (cloth_sides.length * 25000), [cloth_sides]);

  const totalOrder: number = useMemo<number>(() => (orderAmount.length > 0 ? orderAmount.map(order => (order.amount)).reduce((a, b) => (a + b)) : 0), [orderAmount])

  const totalPrice: number = useMemo<number>(() => ((price * totalOrder) + designPrice), [price, designPrice, totalOrder]);

  return (
    <Panel header={<h4>Checkout</h4>} bordered>
      <Form onChange={setFormValues} formValue={formValues} model={model} fluid>
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
          <FormControl maxLength={14} placeholder="Nomor Telepon" name="phone" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Deskripsi Tambahan</ControlLabel>
          <FormControl componentClass="textarea" rows={5} placeholder="Deskripsi Tambahan" name="description" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Bahan custom</ControlLabel>
          <FormControl accepter={Toggle} name="custom_cloth" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Jumlah Pakaian</ControlLabel>
          <ClothSize onChangeOrderAmount={setOrderAmount} />
        </FormGroup>
        <p>Harga Design</p>
        <h5>{cloth_sides.length} design @{`${designPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
        <p>Total Harga</p>
        <h5>Rp. {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
        <p className="secondary-text">Total {totalOrder} buah</p>
        <FormGroup>
          <Divider />
          <Button type="submit" block appearance="primary">Pesan</Button>
        </FormGroup>
      </Form>
    </Panel>
  )
}

export default FormSection
