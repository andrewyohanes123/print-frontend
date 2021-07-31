import styled from "@emotion/styled";

interface props {
  backgroundColor: string;
}

export const ColorDisplay = styled.div<props>(({ backgroundColor }) => ({
  backgroundColor,
  borderRadius: '50%',
  height: 50,
  width: 50
}));