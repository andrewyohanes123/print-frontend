import { FC, ReactElement } from "react"
import { IconButton, Icon, FlexboxGrid } from 'rsuite'
import Container from "./Container"
import { DisplayText } from "./DisplayText"

interface props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

const PageHeader: FC<props> = ({ title, subtitle, onBack }): ReactElement => {
  return (
    <Container>
      <FlexboxGrid align="middle">
        {typeof onBack !== 'undefined' &&
          <FlexboxGrid.Item colspan={1}>
            <IconButton onClick={onBack} icon={<Icon icon="angle-left" />} />
          </FlexboxGrid.Item>}
        <FlexboxGrid.Item colspan={18}>
          <DisplayText as="h4">{title}</DisplayText>
          <DisplayText type="secondary">{subtitle}</DisplayText>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  )
}

export default PageHeader
