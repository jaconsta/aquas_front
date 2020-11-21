import styled from 'styled-components'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'

import { deviceBreakpoints } from '../../CommonStyled/config'

export const DeviceNameContainer = styled.div`
  display: flex;
  & span {
    margin-right: 10px;
  }
`

// Table tricks: https://css-tricks.com/complete-guide-table-element/

export const TableResponsiveChunks = styled(Table)`
  & td:nth-child(1):before{
      content: 'Number';
  }
    & td:nth-child(2):before{
      content: 'Name';
  }
    & td:nth-child(1), td:nth-child(2){
      padding-left: 25%;
  }
  & td:nth-child(1):before, td:nth-child(2):before{
    position: absolute;
    left: .5em;
    font-weight: bold;
  }
  & tr, td{
    display: block;
  }
  tr{
    position: relative;
    margin-bottom: 1em;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  }
  td{
    border-top: none;
  }

`

export const TableHeadResponsive = styled(TableHead)`
  @media ${deviceBreakpoints.mobile} {
    display: none !important;
  }
`
