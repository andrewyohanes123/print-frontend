import { ICollectionOptions } from "@edgarjeremy/sirius.adapter/dist/libs/ModelFactory";
import { FC, ReactElement, useState, useCallback, useEffect, useMemo } from "react"
import useModels from "hooks/useModels";
import { Base, Title, Value } from "./Base";
import useErrorCatcher from "hooks/useErrorCatcher";

interface props {
  options: ICollectionOptions,
  title: string;
  model: string;
  bacground?: string;
  color?: string;
  borderColor?: string;
}

const Statistic: FC<props> = ({ options, title, model, color, borderColor, bacground }): ReactElement => {
  const [value, setValue] = useState<number>(0);
  const { errorCatch } = useErrorCatcher();
  const { models } = useModels();

  const memoizedOptions = useMemo(() => (options), [options]);
  const memoizedModelName = useMemo(() => (model), [model]);

  const getValue = useCallback(() => {
    models[memoizedModelName].collection(memoizedOptions).then(resp => {
      setValue(resp.count);
    }).catch(errorCatch)
  }, [memoizedOptions, models, errorCatch, memoizedModelName]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  return (
    <Base background={bacground} borderColor={borderColor}>
      <Title as="p" color={color}>{title}</Title>
      <Value color={color}>{value}</Value>
    </Base>
  )
}

export default Statistic;
