import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

import { deviceBreakpoints } from '../../CommonStyled/config'


export const AddDevicebuttonStyled = styled.div`
    width: 300px;
    height: 50px;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 40px !important;
    margin-bottom: 70px !important;
    @media ${deviceBreakpoints.mobile} {
        width: 100%;
        & button {
          margin-left: 20px !important;
          margin-right: 20px !important;
        }
    }
`

export const AddDeviceForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @media ${deviceBreakpoints.mobile} {
    flex-direction: column;
    align-items: start;
    margin-left: 20px;
    margin-right: 20px;
  }
`

export const DeviceNameField = styled(TextField)`
  flex-grow: 2;
  margin-right: 30px !important;
  @media ${deviceBreakpoints.fullHd} {
    flex-grow: 1;
  }
  @media ${deviceBreakpoints.mobile} {
    flex-grow: 1;
    width: 100%
    margin-bottom: 30px !important;
  }
`

export const ActionButtonsContainer = styled.div`
  flex-grow: 1;
  margin-bottom: 30px;
  @media ${deviceBreakpoints.mobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 50px;
  }
  & button {
      margin-left:10px;
      margin-right: 10px;
  }
`

export const EmptySpace = styled.div`
  flex-grow: 1;
  @media ${deviceBreakpoints.mobile} {
    display: none;
  }
  @media ${deviceBreakpoints.mobile} {
    flex-grow: 2;
  }
`
