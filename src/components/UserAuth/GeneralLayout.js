import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar'

import {
  Layout,
  AuthPaperContainer,
  LogoImage,
  TitleText,
} from './styled'
import pomelo_logo from '../../static/images/pomelo_logo.png';

const GeneralLayout = props => {
  const { title, children, error } = props

  return (
    <Layout>
      <AuthPaperContainer>
        <div>
          <LogoImage alt="Pomelo logo" src={pomelo_logo} />
          <TitleText>{title}</TitleText>
        </div>
        { children }
      </AuthPaperContainer>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={error.open}
        onClose={error.onClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{error.message}</span>}
      />

    </Layout>
  );
}

GeneralLayout.propTypes = {
  // children: PropTypes.oneOf([PropTypes.array, PropTypes.object]),  // Validate this
  title: PropTypes.string,
  error: PropTypes.shape({
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string
  })
}

GeneralLayout.defaultProps = {
  error: {}
}

export default GeneralLayout
