import useErrorCatcher from "hooks/useErrorCatcher";
import useModels from "hooks/useModels"
import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import { List, Panel } from "rsuite"
import { ClothAttributes, RawClothAttributes } from "types";
import ClothPanel from "./ClothPanel";

const ClothLists: FC = (): ReactElement => {
  const { models: { Cloth } } = useModels();
  const [cloths, setCloths] = useState<RawClothAttributes[]>([]);
  const { errorCatch } = useErrorCatcher();

  const getCloths = useCallback(() => {
    Cloth.collection({
      attributes: ['name', 'id', 'price'],
    }).then(resp => {
      setCloths((resp.rows as ClothAttributes[]).map(({ name, price, id }) => ({ name, price, id })));
    }).catch(e => {
      errorCatch(e);
    });
  }, [Cloth, errorCatch, setCloths]);

  useEffect(() => {
    getCloths();
  }, [getCloths])

  return (
    <Panel style={{ height: '100%' }} bordered bodyFill header={<h5>Pilih Pakaian</h5>}>
      <List style={{ padding: 8 }}>
        {cloths.map(cloth => (
          <ClothPanel key={cloth.id} cloth={cloth} />
        ))}
      </List>
    </Panel>
  )
}

export default ClothLists
