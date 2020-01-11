import styled from 'styled-components'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { deviceBreakpoints } from '../CommonStyled/config'

export const Layout = styled.div`
  width: auto;
  display: block;  /* Fix IE11 issue. */
`

export const AuthPaperContainer = styled(Paper)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  @media ${deviceBreakpoints.mobile} {
    margin-top: 50px;
    width: 100%;
    border-bottom-color: transparent !important;
    box-shadow: none !important;
  }
`

export const LogoImage = styled.img`
  margin-top: 20px;
  max-width: 400px;
  @media ${deviceBreakpoints.mobile} {
    margin-Top: 5px;
    max-Width: 280px;
  }
`

export const TitleText = styled.h1`
  text-align: center;
  @media ${deviceBreakpoints.mobile} {
    margin-top: 10px;
    margin-bottom: 8px;
  }
`

export const AuthInput = styled(TextField)`
  @media ${deviceBreakpoints.mobile} {
    margin: 0 12px !important;
  }
`

export const RegisterText = styled.span`
  @media ${deviceBreakpoints.mobile} {
    display: none;
  }
`

export const RememberLabel = styled(FormControlLabel)`
  @media ${deviceBreakpoints.mobile} {
    /* display: 'none', // Looks better without it */
    margin-left: 20px !important;
    margin-bottom: 15px !important;
  }
`
