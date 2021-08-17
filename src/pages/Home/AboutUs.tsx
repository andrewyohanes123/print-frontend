import { FC, ReactElement, useState, useCallback, useEffect } from "react"
import Container from "components/Container"
import { Header } from "components/FullscreenDiv"
import { Divider, Placeholder } from "rsuite"
import { AboutAttributes } from "types"
import useModels from "hooks/useModels"
import useErrorCatcher from "hooks/useErrorCatcher"

const AboutUs: FC = (): ReactElement => {
  const [abouts, setAbouts] = useState<AboutAttributes[]>([]);
  const [loading, toggleLoading] = useState<boolean>(true);
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
    retry < 4 && getAbouts();
  }, [getAbouts, retry]);

  return (
    <>
      <Container>
        <Header textColor="black" fontSize={25} style={{ textAlign: 'center' }} as={'h1'}>Tentang Kami</Header>
        <Divider />
        {loading ?
          <Placeholder.Paragraph active={loading} />
          :
          abouts.map(about => (
            <p key={about.id.toString()} style={{ textAlign: 'center' }}>{about.content}</p>
          ))
        }
      </Container>
    </>
  )
}

export default AboutUs
