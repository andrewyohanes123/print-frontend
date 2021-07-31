import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { useParams } from "react-router"
import { CheckPicker, Button, Divider, TagGroup, Tag, Alert } from "rsuite"
import Container from "components/Container"
import { SizeAttributes } from "types"
import useModels from "hooks/useModels"
import useErrorCatcher from "hooks/useErrorCatcher"

const sizesArr: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

const Sizes: FC = (): ReactElement => {
  const [sizes, setSizes] = useState<SizeAttributes[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [retry, setRetry] = useState<number>(0);
  const { models: { Size } } = useModels();
  const { id } = useParams<{ id: string }>();
  const { errorCatch } = useErrorCatcher();

  const getSizes = useCallback(() => {
    Size.collection({
      attributes: ['size', 'cloth_id'],
      where: {
        cloth_id: id
      }
    }).then(res => {
      setSizes(res.rows as SizeAttributes[]);
    }).catch(e => {
      errorCatch(e);
      setRetry(retry => retry + 1);
    });
  }, [Size, id, errorCatch]);

  useEffect(() => {
    if (retry < 4) {
      getSizes();
    }
  }, [retry, getSizes]);

  const createSize = useCallback(() => {
    selectedSizes.forEach(async (size: string, idx: number): Promise<void> => {
      try {
        const createdSize = await Size.create({ size, cloth_id: id });
        // @ts-ignore
        Alert.success(`Size ${createdSize.size} berhasil disimpan`);
        if (idx === (selectedSizes.length - 1)) {
          getSizes();
          setSelectedSizes([]);
        }
      } catch (error) {
        errorCatch(error);
      }
    });
  }, [Size, selectedSizes, errorCatch, getSizes, id]);

  const deleteSize = useCallback((size: SizeAttributes) => {
    size.delete().then(resp => {
      Alert.error(`Size ${resp.name} berhasil dihapus`);
      getSizes();
    }).catch(e => {
      errorCatch(e);
    });
  }, [errorCatch, getSizes]);

  return (
    <Container>
      <CheckPicker placeholder="Pilih size" placement="topStart" value={selectedSizes} onChange={setSelectedSizes}
        // @ts-ignore
        data={sizesArr.filter(size => !sizes.map(size => (size.size)).includes(size)).map((size) => ({ value: size, label: size }))}
      />
      <Divider vertical />
      <Button onClick={createSize} color="green">Tambah</Button>
      <Divider />
      {sizes.length > 0 ?
        <TagGroup gutter={8}>
          {
            sizes.map(size => (
              <Tag key={size.id} closable onClose={() => deleteSize(size)} >
                {size.size}
              </Tag>
            ))
          }
        </TagGroup>
        :
        <p className="secondary-text" style={{ textAlign: 'center', marginBottom: 12 }}>Tidak ada data size pakaian. Silakan tambah data size pakaian</p>
      }
    </Container>
  )
}

export default Sizes
