import { FC, ReactElement, useState, useCallback } from "react"
import { Panel, Button, Uploader, Alert } from 'rsuite'
import moment from "moment"
import { OrderAttributes } from "types"
import DetailPanel from "./DetailPanel"
import { baseUrl } from "App"
import { FileType } from "rsuite/lib/Uploader"
import useErrorCatcher from "hooks/useErrorCatcher"

interface props {
  order: OrderAttributes;
  publicView?: boolean;
  onUpdateOrder?: () => void;
}

const OrderPanel: FC<props> = ({ order, publicView, onUpdateOrder }): ReactElement => {
  const [files, setFiles] = useState<FileType[]>([]);
  const {errorCatch} = useErrorCatcher();

  const uploadReceipt = useCallback(() => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('receipt', files[0].blobFile as File);
      order.update(formData).then(resp => {
        setFiles([]);
        Alert.success(`File resi atas nama ${resp.name} berhasil di-upload`);
        onUpdateOrder && onUpdateOrder();
      }).catch(errorCatch);
    }
  }, [files, errorCatch, onUpdateOrder, order]);

  return (
    <Panel header={<h6>Data Orderan</h6>} defaultExpanded={true} collapsible bordered>
      <DetailPanel label="Nama pemesan" value={order.name} />
      <DetailPanel label="Email pemesan" value={order.email} />
      <DetailPanel label="Nomor telepon" value={order.phone} />
      <DetailPanel label="Dipesan pada" value={moment(order.updated_at).format('DD MMM YYYY hh:mm:ss')} />
      <DetailPanel label="Status Pesanan" value={order.status} />
      <DetailPanel label="Deskripsi" value={order.description === null ? 'Tidak Ada Deskripsi' : order.description} />
      {(order.receipt_file !== null) && <Panel bordered>
        <h6>Resi Pembayaran</h6>
        <img alt="resi" style={{ width: '100%' }} draggable={false} src={`${baseUrl}/public/files/${order.receipt_file}`} />
      </Panel>}
      {
        (publicView && order.receipt_file === null) &&
        <Panel bordered>
          <Uploader key={`${files.length}`} autoUpload={false} accept="image/png" onChange={setFiles} fileList={files}>
            <Button>Pilih file resi</Button>
          </Uploader>
          {files.length > 0 && <Button onClick={uploadReceipt} color="blue">Upload</Button>}
        </Panel>
      }
    </Panel>
  )
}

export default OrderPanel
