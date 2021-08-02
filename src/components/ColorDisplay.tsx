import styled from "@emotion/styled";

interface props {
  backgroundColor: string;
  size?: number;
}

export const ColorDisplay = styled.div<props>(({ backgroundColor, size }) => ({
  backgroundColor,
  borderRadius: '50%',
  height: size ?? 50,
  width: size ?? 50
}));