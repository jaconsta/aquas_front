import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { deviceBreakpoints } from '../../CommonStyled/config'


export const MediumSizeCard = styled(Card)`
  width: 400px;
  margin: 100px 0;
  @media ${deviceBreakpoints.mobile} {
    width: 95%;
  }
`

export const MediumSizeCardContent = styled(CardContent)`
  padding-bottom: 16px !important;
`

export const Title = styled.div`
  color: gray;
  margin-bottom: 15px;
`
