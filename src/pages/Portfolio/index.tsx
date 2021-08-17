import { FC, ReactElement, useState, useEffect, useCallback } from "react"
import Container from "components/Container"
import AddPortfolio from "./AddPortfolio"
import { ModelCollectionResult, PortfolioAttributes } from "types";
import useModels from "hooks/useModels";
import useErrorCatcher from "hooks/useErrorCatcher";
import Lists from "./Lists";
import { Alert } from "rsuite";

const Portfolio: FC = (): ReactElement => {
  const [modal, toggleModal] = useState<boolean>(false);
  const [portfolios, setPortfolios] = useState<ModelCollectionResult<PortfolioAttributes>>({ rows: [], count: 0 });
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const { models: { Portfolio } } = useModels();
  const { errorCatch } = useErrorCatcher();

  const getPortfolios = useCallback(() => {
    const offset = (page - 1) * limit;
    Portfolio.collection({
      limit, offset,
      attributes: ['picture'],
    }).then(resp => {
      setPortfolios(resp as ModelCollectionResult<PortfolioAttributes>);
    }).catch(e => {
      errorCatch(e);
    })
  }, [errorCatch, limit, page, Portfolio]);

  const deletePortfolio = useCallback((portfolio: PortfolioAttributes) => {
    portfolio.delete().then(resp => {
      console.log(resp.toJSON());
      Alert.success('Gambar portfolio berhasil dihapus');
      getPortfolios();
    }).catch(errorCatch);
  }, [errorCatch, getPortfolios]);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  return (
    <>
      <Container>
        <h3>Portfolio</h3>
        {false && <AddPortfolio visible={modal} onOpen={() => toggleModal(true)} onCancel={() => toggleModal(false)} onSubmit={() => console.log('')} />}
      </Container>
      <Lists onDelete={deletePortfolio} pagination={{ page, onSelect: setPage, total: portfolios.count, limit }} data={portfolios.rows} />
    </>
  )
}

export default Portfolio
