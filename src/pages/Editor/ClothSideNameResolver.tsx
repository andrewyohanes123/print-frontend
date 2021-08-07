import useModels from "hooks/useModels"
import { FC, ReactElement, useCallback, useEffect, useState } from "react"
import {Placeholder} from 'rsuite'

const ClothSideNameResolver: FC<{ id: number }> = ({ id }): ReactElement => {
  const [name, setName] = useState<string>('');
  const [retry, setRetry] = useState<number>(0);
  const { models: { ClothSide } } = useModels();

  const getSideName = useCallback(() => {
    ClothSide.single(id).then(resp => {
      setName(resp.name);
    }).catch(e => {
      console.log(e);
      setRetry(retry => retry + 1);
    })
  }, [id, ClothSide]);

  useEffect(() => {
    if (retry < 4) {
      getSideName();
    }
  }, [getSideName, retry]);

  return (
    name.length === 0
    ?
    <Placeholder.Paragraph rows={1} />
    :
    <p>
      {name}
    </p>
  )
}

export default ClothSideNameResolver
