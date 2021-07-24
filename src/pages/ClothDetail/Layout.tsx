import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import PageHeader from "components/PageHeader"
import useModels from "hooks/useModels"
import { ClothAttributes } from "types";
import { useParams, useHistory } from "react-router-dom";
import useErrorCatcher from "hooks/useErrorCatcher";
import FullscreenDiv, { Header, SubHeader } from "components/FullscreenDiv";
import Container from "components/Container";
import AddClothSide from "./AddClothSide";

const Layout: FC = (): ReactElement => {
  const { models: { Cloth } } = useModels();
  const [cloth, setCloth] = useState<ClothAttributes | undefined>(undefined);
  const [loading, toggleLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const { errorCatch } = useErrorCatcher();

  const getCloth = useCallback(() => {
    toggleLoading(true);
    Cloth.single(parseInt(id)).then(resp => {
      setCloth(resp as ClothAttributes);
      toggleLoading(false);
    }).catch(e => {
      errorCatch(e);
    })
  }, [Cloth, id, errorCatch]);

  useEffect(() => {
    getCloth();
  }, [id, getCloth]);

  return (
    <>
      <PageHeader onBack={() => push('/dashboard/kaos')} title={cloth?.name ?? 'Loading Detail'} subtitle="Detail Pakaian" />
      {loading ?
        <FullscreenDiv flex={true} justifyContent="center" alignItems="center" background='white'>
          <Header style={{ fontSize: 25 }} textColor="black">Loading</Header>
          <SubHeader style={{ color: '#abbcd5' }}>mengambil detail pakaian</SubHeader>
        </FullscreenDiv>
        :
        <Container>
          <AddClothSide />

        </Container>
      }
    </>
  )
}

export default Layout
