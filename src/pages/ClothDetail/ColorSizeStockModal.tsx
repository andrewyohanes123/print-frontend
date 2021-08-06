import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Modal, CheckPicker, Button, Divider, Alert, Loader } from 'rsuite'
import { ColorAttributes, ColorSizeStockAttributes, SizeAttributes } from "types"
import StockPanel from "./StockPanel";

interface props {
  show?: boolean;
  onHide?: () => void;
  color: ColorAttributes;
}

const ColorSizeStockModal: FC<props> = ({ show, onHide, color }): ReactElement => {
  const [sizes, setSizes] = useState<SizeAttributes[]>([]);
  const [retry, setRetry] = useState<number>(0);
  const [stocks, setStocks] = useState<ColorSizeStockAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(true);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [submitting, toggleSubmitting] = useState<boolean>(false);
  const { id: cloth_id } = useParams<{ id: string }>();
  const { models: { Size, ColorSizeStock } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getSizes = useCallback(() => {
    Size.collection({
      attributes: ['id', 'size'],
      include: [{
        model: 'ColorSizeStock',
        attributes: ['color_id'],
        where: {
          color_id: color.id
        },
        // @ts-ignore
        required: false
      }],
      where: {
        cloth_id
      }
    }).then(resp => {      
      console.log(resp);
      setSizes(resp.rows.filter(row => row.color_size_stocks.length === 0) as SizeAttributes[]);
    }).catch(e => {
      errorCatch(e);
      setRetry(attempt => attempt + 1);
    })
  }, [errorCatch, Size, color, cloth_id]);

  useEffect(() => {
    if (retry < 4 && show) {
      getSizes();
    }
  }, [getSizes, retry, show]);

  const getStocks = useCallback((loading: boolean = false) => {
    toggleLoading(loading);
    ColorSizeStock.collection({
      where: {
        cloth_id,
        color_id: color.id,
      },
      attributes: ['cloth_id', 'color_id', 'stock', 'size_id'],
      include: [{
        model: 'Size',
        attributes: ['size', 'id']
      }],
      order: [['id', 'asc']]
    }).then(resp => {
      setStocks(resp.rows as ColorSizeStockAttributes[]);
      toggleLoading(false);
      getSizes();
    }).catch(e => {
      toggleLoading(false);
      errorCatch(e);
    });
  }, [ColorSizeStock, errorCatch, cloth_id, color, getSizes]);

  const createSizeStocks = useCallback(() => {
    toggleSubmitting(true);
    selectedSizes.forEach(async (size_id: number, idx: number) => {
      const createdStock = await ColorSizeStock.create({
        size_id,
        color_id: color.id,
        cloth_id,
        stock: 0
      });
      Alert.success(`Stock berhasil ditambah`);
      console.log(createdStock);
      if ((idx + 1) === selectedSizes.length) {
        toggleSubmitting(false);
        getStocks();
      }
    })
  }, [selectedSizes, color, ColorSizeStock, cloth_id, getStocks]);

  useEffect(() => {
    show && getStocks(true);
  }, [getStocks, show]);

  return (
    <Modal overflow={false} show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Stock {color.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CheckPicker disabled={submitting || sizes.length === 0} onChange={setSelectedSizes} value={selectedSizes} placeholder="Pilih size" data={sizes.map(size => ({ value: size.id, label: size.size }))} />
        <Divider vertical />
        <Button onClick={createSizeStocks} disabled={submitting || sizes.length === 0} loading={submitting} color="green">Tambah</Button>
        <Divider />
        {
          loading ?
            <Loader size="md" content="Loading Stock" />
            :
            stocks.length > 0 ?
              stocks.map(stock => (
                <StockPanel stock={stock} onUpdateStock={getStocks} />
              ))
              :
              <p className="secondary-text" style={{ textAlign: 'center' }}>Tambah stock untuk warna <code>{color.name}</code></p>
        }
      </Modal.Body>
    </Modal>
  )
}

export default ColorSizeStockModal
