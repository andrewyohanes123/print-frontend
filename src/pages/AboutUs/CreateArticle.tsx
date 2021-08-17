import Container from "components/Container";
import FullscreenDiv from "components/FullscreenDiv";
import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import { Alert, Button, Icon, Placeholder } from "rsuite";
import { AboutAttributes } from "types"
import ArticleForm from "./ArticleForm";

const CreateArticle: FC = (): ReactElement => {
  const [abouts, setAbouts] = useState<AboutAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(true);
  const [addForm, toggleAddForm] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);
  const { models: { About } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getAbouts = useCallback((loading: boolean = false) => {
    toggleLoading(loading);
    About.collection({
      limit: 1,
      offset: 0,
      attributes: ['content']
    }).then(resp => {
      toggleLoading(false);
      setAbouts(resp.rows as AboutAttributes[]);
    }).catch((e) => {
      errorCatch(e);
      setRetry(retry => retry + 1);
    });
  }, [About, errorCatch]);

  useEffect(() => {
    (retry < 4) && getAbouts(true);
  }, [getAbouts, retry]);

  const createArticle = useCallback((val: any) => {
    About.create(val).then(resp => {
      Alert.success('Artikel berhasil dibuat');
      getAbouts();
      toggleAddForm(false);
      console.log(resp.toJSON());
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, About, getAbouts]);

  const updateArticle = useCallback((val: any, about: AboutAttributes) => {
    about.update(val).then(resp => {
      getAbouts();
      Alert.success('Artikel berhasil disimpan');
      console.log(resp.toJSON());
    }).catch(e => {
      errorCatch(e);
    })
  }, [getAbouts, errorCatch]);

  return (
    loading ?
      <Placeholder.Paragraph active />
      :
      abouts.length > 0 ?
        <Container>
          {abouts.map(about => (
            <ArticleForm onSubmit={val => updateArticle(val, about)} content={about.content} key={`${about.id}`} />
          ))}
        </Container>
        :
        addForm ?
          <Container>
            <ArticleForm onSubmit={createArticle} />
          </Container>
          :
          <FullscreenDiv background="white" flexDirection="column" flex={true} justifyContent="center" alignItems="center">
            <Icon icon="plus-circle" style={{ fontSize: 120 }} className="secondary-text" />
            <h5>Tidak ada artikel tentang kami</h5>
            <p className="secondary-text mb-2">Silakan tambah artikel tentang kami</p>
            <Button className="mb-2" color="green" onClick={() => toggleAddForm(true)}>Tambah</Button>
          </FullscreenDiv>
  )
}

export default CreateArticle
