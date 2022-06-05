import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Styled_Wrrapper = styled.div`
    position: sticky !important;
    bottom: 0;
    width: 100%;
    margin-top: 110px;
`

export const Styled_Fab = styled(Fab)`
    position: absolute;
    bottom: 50px;
    right: 20px;
  z-index: 100;
`
