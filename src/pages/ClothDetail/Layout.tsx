import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import PageHeader from "components/PageHeader"
import useModels from "hooks/useModels"
import { ClothAttributes, ClothSideAttributes, ModelCollectionResult } from "types";
import { useParams, useHistory } from "react-router-dom";
import useErrorCatcher from "hooks/useErrorCatcher";
import FullscreenDiv, { Header, SubHeader } from "components/FullscreenDiv";
import Container from "components/Container";
import AddClothSide from "./AddClothSide";
import { Alert } from "rsuite";
import SideLists from "./SideLists";
import { FileType } from "rsuite/lib/Uploader";

const Layout: FC = (): ReactElement => {
  const { models: { Cloth, ClothSide } } = useModels();
  const [cloth, setCloth] = useState<ClothAttributes | undefined>(undefined);
  const [sides, setSides] = useState<ModelCollectionResult<ClothSideAttributes>>({ count: 0, rows: [] });
  const [loading, toggleLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const { errorCatch } = useErrorCatcher();

  const getCloth = useCallback(() => {
    toggleLoading(true);
    Cloth.single(parseInt(id)).then(resp => {
      setCloth(resp as ClothAttributes);
    }).catch(e => {
      errorCatch(e);
    })
  }, [Cloth, id, errorCatch]);

  useEffect(() => {
    getCloth();
  }, [id, getCloth]);
  
  const getSides = useCallback(() => {
    ClothSide.collection({
      attributes: ['name', 'id', 'cloth_background', 'cloth_base'],
      where: {
        cloth_id: id
      },
      include: [{
        model: 'Cloth',
        attributes: ['name']
      }]
    }).then(resp => {
      toggleLoading(false);
      setSides(resp as ModelCollectionResult<ClothSideAttributes>);
    }).catch(e => {
      errorCatch(e);
    })
  }, [ClothSide, errorCatch, id]);

  const createClothSide = useCallback((val: {name: string; cloth_base: FileType; cloth_background: FileType;}, cb: () => void) => {
    const formData = new FormData();
    formData.append('name', val.name);
    // @ts-ignore
    formData.append('cloth_base', val.cloth_base.blobFile);
    // @ts-ignore
    formData.append('cloth_background', val.cloth_background.blobFile);
    formData.append('cloth_id', id);
    ClothSide.create(formData).then(resp => {
      Alert.success(`Sisi ${resp.name} berhasil ditambah`);
      getSides();
      cb();
    }).catch(e => {
      errorCatch(e);
      cb();
    })
  }, [errorCatch, getSides, id, ClothSide]);

  const deleteSide = useCallback((side: ClothSideAttributes) => {
    side.delete().then(resp => {
      Alert.success(`Sisi ${resp.name} berhasil dihapus`);
      getSides();
    }).catch(e => {
      errorCatch(e);
    })
  }, [getSides, errorCatch]);

  useEffect(() => {
    getSides();
  }, [getSides])

  return (
    <>
      <PageHeader onBack={() => push('/dashboard/kaos')} title={cloth?.name ?? 'Loading Detail'} subtitle="Detail Pakaian" />
      {loading ?
        <FullscreenDiv flex={true} justifyContent="center" alignItems="center" background='white'>
          <Header style={{ fontSize: 25 }} textColor="black">Loading</Header>
          <SubHeader style={{ color: '#abbcd5' }}>mengambil detail pakaian</SubHeader>
        </FullscreenDiv>
        :
        <Container height="calc(100% - 105px)">
          <AddClothSide onSubmit={createClothSide} />
          <SideLists onDelete={deleteSide} sides={sides.rows} loading={loading} />
        </Container>
      }
    </>
  )
}

export default Layout
