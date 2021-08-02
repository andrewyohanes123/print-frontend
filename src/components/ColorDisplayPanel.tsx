import styled from "@emotion/styled";

export const ColorDisplayPanel = styled.div({
  ":hover": {
    boxShadow: '0 4px 4px rgb(0 0 0 / 12%), 0 0 10px rgb(0 0 0 / 6%)'
  },
  padding: 8,
  borderRadius: 8,
  border: '1px solid #e5e5ea',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  userSelect: 'none',
  transition: '.15s ease-in-out'  
});