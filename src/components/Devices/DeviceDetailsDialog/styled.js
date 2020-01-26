import styled from 'styled-components'

import { deviceBreakpoints } from '../../CommonStyled/config'

export const DaySwitchesContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  @media ${deviceBreakpoints.mobile} {
    flex-direction: column;
    margin-left: 15px;
  }
`

export const DaySelectColumn = styled.div`
  text-align: center;
  @media ${deviceBreakpoints.mobile} {
    text-align: left;
    span:first-child {
    }
  }
`
