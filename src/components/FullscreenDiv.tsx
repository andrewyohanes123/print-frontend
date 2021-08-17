import styled from '@emotion/styled'
import logo from '../assets/logo.png'

interface props {
  background?: string;
  flex?: boolean;
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: 'row' | 'column';
}

interface HeaderProps {
  textColor?: string;
  fontSize?: number | string;
}

export const Header = styled.h1<HeaderProps>(({ textColor, fontSize }) => ({
  color: textColor ?? 'white',
  margin: 0,
  fontWeight: 500,
  fontSize: fontSize ?? 50,
}))

export const SubHeader = styled.p({
  color: 'white',
  margin: 5,
})

export const Logo = styled.img({
  // width: 250,
  height: 250,
  mixBlendMode: 'overlay'
});

Logo.defaultProps = {
  src: logo
}

const FullscreenDiv = styled.div<props>(({ background, flex, justifyContent, alignItems, flexDirection }) => ({
  height: '100%',
  width: '100%',
  background: background ?? '#880061',
  display: flex ? 'flex' : 'block',
  justifyContent: flex ? justifyContent ?? 'flex-start' : undefined,
  alignItems: flex ? alignItems ?? 'flex-start' : undefined,
  flexDirection,
  padding: '2.5em'
}));

FullscreenDiv.defaultProps = {
  flex: true,
}

export default FullscreenDiv;