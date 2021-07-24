import styled from '@emotion/styled'

interface props {
  margin?: number | string;
  padding?: number | string;
  background?: string;
  height?: number | string;
}

const Container = styled.div<props>(({ padding, margin, background, height }) => ({
  padding: 12,
  margin: 0,
  background: 'white',
  height,
}));

// Container.defaultProps = {
//   padding: 12,
//   margin: 0,
//   background: '#fff'
// }

export default Container;