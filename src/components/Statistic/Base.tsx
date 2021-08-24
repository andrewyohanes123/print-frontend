import styled from "@emotion/styled";

interface baseProps {
  background?: string;
  borderColor?: string;
}

interface titleProps {
  color?: string;
}

interface valueProps {
  color?: string;
}

export const Base = styled.div<baseProps>(({ background, borderColor }) => ({
  background,
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor
}));

export const Title = styled.h6<titleProps>(({ color }) => ({
  color,
  fontWeight: 'normal'
}));

export const Value = styled.p<valueProps>(({ color }) => ({
  color,
  fontWeight: 'normal',
  fontSize: 35
}));

Base.defaultProps = {
  background: 'white',
  borderColor: '#e5e5ea'
}

Title.defaultProps = {
  color: 'black'
}

Value.defaultProps = {
  color: 'black'
}