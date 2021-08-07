import { FC, ReactElement, useState, useEffect, useContext, useCallback, useMemo } from "react"
import { Form, FormGroup, FormControl, ControlLabel, Panel, Divider, Button, Schema, Toggle, Message } from 'rsuite'
import useModels from "hooks/useModels"
import { EditorContext } from ".";
import ClothSize, { OrderAmount } from "./ClothSize";
import { toBase64 } from 'modules/fileToBase64'
import useErrorCatcher from "hooks/useErrorCatcher";
import { OrderAttributes } from "types";
// import { RawOrderCountAttributes, SizeAttributes } from "types";

// const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const { StringType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Masukkan nama lengkap').minLength(4, 'Masukkan nama lebih dari 4 karakter'),
  email: StringType().isEmail('Masukkan alamat email yang valid').isRequired('Masukkan alamat email'),
  phone: StringType().isRequired('Masukkan nomor telepon')
});

const FormSection: FC = (): ReactElement => {
  const { models: { Cloth, Order } } = useModels();
  const { cloth_id, cloth_sides, setStep, setOrderSuccess, color_id } = useContext(EditorContext);
  const [price, setPrice] = useState<number>(100);
  const [clothName, setClothName] = useState<string>('');
  const [retry, setRetry] = useState<number>(0);
  const [formValues, setFormValues] = useState<{ [any: string]: any }>({});
  const [orderAmount, setOrderAmount] = useState<OrderAmount[]>([]);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { errorCatch } = useErrorCatcher();
  // const [sizes, setSizes] = useState<SizeAttributes[]>([]);

  const getClothPrice = useCallback(() => {
    if (typeof cloth_id !== 'undefined') {
      Cloth.single(cloth_id).then(resp => {
        setPrice(resp.price);
        setClothName(resp.name)
      }).catch(e => {
        console.log(e);
        setRetry(count => count + 1);
      })
    }
  }, [Cloth, cloth_id, setRetry]);

  const createOrder = useCallback(async (valid: boolean) => {
    try {
      toggleLoading(true)
      const files = await Promise.all(cloth_sides.map(side => toBase64(side)));
      const order = await Order.create({
        ...formValues,
        order_counts: orderAmount,
        cloth_sides: files,
        cloth_id,
        color_id
      })
      toggleLoading(false);
      setOrderSuccess(order as OrderAttributes);
      setStep(3);
      console.log(order)
    } catch (error) {
      errorCatch(error);
    }
  }, [cloth_sides, formValues, orderAmount, Order, errorCatch, setStep, setOrderSuccess, color_id, cloth_id]);

  useEffect(() => {
    (retry < 4) && getClothPrice();
  }, [retry, getClothPrice]);

  const designPrice: number = useMemo<number>(() => (cloth_sides.length * 25000), [cloth_sides]);

  const totalOrder: number = useMemo<number>(() => (
    orderAmount.length > 0 ? orderAmount.map(order => (order.amount)).reduce((a, b) => (a + b)) : 0
  ), [orderAmount])

  const totalPrice: number = useMemo<number>(() => (
    formValues.custom_cloth ?
      (designPrice * totalOrder)
      :
      (price * totalOrder) + (designPrice * totalOrder)),
    [price, designPrice, totalOrder, formValues]);

  return (
    <Panel header={<h4>Checkout</h4>} bordered>
      <Form onChange={setFormValues} onSubmit={createOrder} formValue={formValues} model={model} fluid>
        <FormGroup>
          <ControlLabel>Nama</ControlLabel>
          <FormControl disabled={loading} placeholder="Nama Lengkap" name="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Alamat Email</ControlLabel>
          <FormControl disabled={loading} placeholder="Alamat Email" name="email" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Nomor Telepon</ControlLabel>
          <FormControl disabled={loading} maxLength={14} placeholder="Nomor Telepon" name="phone" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Deskripsi Tambahan</ControlLabel>
          <FormControl disabled={loading} componentClass="textarea" rows={5} placeholder="Deskripsi Tambahan" name="description" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Bahan custom</ControlLabel>
          <FormControl disabled={loading} accepter={Toggle} name="custom_cloth" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Jumlah Pakaian</ControlLabel>
          <ClothSize onChangeOrderAmount={setOrderAmount} />
        </FormGroup>
        {loading && <Message type="info" title="Loading" description="Sedang mengunggah file design. Mohon tunggu sebentar" />}
        <p>Harga Design</p>
        <h5>{cloth_sides.length} design @{`${designPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
        <p>Total Harga</p>
        <h5>Rp. {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h5>
        <p className="secondary-text">Total {totalOrder} buah {clothName}</p>
        <FormGroup>
          <Divider />
          <Button disabled={loading} loading={loading} type="submit" block appearance="primary">Pesan</Button>
        </FormGroup>
      </Form>
    </Panel>
  )
}

export default FormSection
