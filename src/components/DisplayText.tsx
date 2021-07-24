import styled from "@emotion/styled";

interface props {
  fontSize?: number | string;
  type?: 'primary' | 'secondary'
}

export const DisplayText = styled.div<props>(({fontSize, type}) => ({
  fontSize,
  color: typeof type !== 'undefined' ? type === 'primary' ? '#161c2d' : '#abbcd5' : 'black'
}))