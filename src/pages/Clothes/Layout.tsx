import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { Alert } from "rsuite";
import { ClothAttributes, ModelCollectionResult } from "types";
import AddClothModal from "./AddClothModal";
import ClothList from "./ClothList";

const Layout: FC = (): ReactElement => {
  const [cloths, setCloths] = useState<ModelCollectionResult<ClothAttributes>>({ rows: [], count: 0 });
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [loading, toggleLoading] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { models: { Cloth } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getClothes = useCallback(() => {
    toggleLoading(true);
    const offset = (page - 1) * limit;
    Cloth.collection({
      attributes: ['name', 'price'],
      limit, offset,      
    }).then((resp) => {
      toggleLoading(false);
      setCloths(resp as ModelCollectionResult<ClothAttributes>);
    }).catch(e => {
      errorCatch(e);
      toggleLoading(false);
      setRetryCount(count => count + 1);
    })
  }, [Cloth, errorCatch, limit, page]);

  useEffect(() => {
    if (retryCount < 5) {
      getClothes();
    }
    // eslint-disable-next-line
  }, [getClothes, retryCount, limit, page]);

  const createCloth = useCallback((val: {name: string;}, cb: () => void) => {
    Cloth.create({
      ...val,
    }).then(resp => {
      Alert.success(`Jenis Kaos ${resp.name} berhasil ditambah`);
      cb();
      getClothes();
    }).catch(e => {
      cb();
      errorCatch(e);
    })
  },[errorCatch, Cloth, getClothes])

  return (
    <>
      <AddClothModal onSubmit={createCloth} />
      <ClothList clothes={cloths.rows} loading={loading} pagination={{ limit, page, total: cloths.count, onSelect: setPage }} />
    </>
  )
}

export default Layout
