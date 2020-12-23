import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const MaskDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #00000094;
  display: none;
`

export function Mask({ open, onShow, onHide, children, ...props }) {
  function onMaskAnimationEnd() {
    if (open) {
      onShow()
    } else {
      onHide()
    }
  }
  return (
    <MaskDiv open={open} onAnimationEnd={onMaskAnimationEnd} {...props}>
      {children}
    </MaskDiv>
  )
}

Mask.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onShow: PropTypes.func,
  onHide: PropTypes.func
}
