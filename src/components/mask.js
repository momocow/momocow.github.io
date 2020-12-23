import React, { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const MaskDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 100%;
  bottom: 100%;
  background-color: #00000094;
  transition: left .2s ease-out, bottom .2s ease-out;

  ${props => props.open ? {
    left: 0,
    bottom: 0
  } : {
    left: '100%',
    bottom: '100%'
  }}
`

export function Mask({ open, onShow, onHide, children, ...props }) {
  const maskRef = useRef()
  useEffect(() => {
    const maskDiv = maskRef.current
    function onMaskAnimationEnd() {
      if (open) {
        onShow()
      } else {
        onHide()
      }
    }
    maskDiv.addEventListener('animationend', onMaskAnimationEnd, { once: true })
    return maskDiv.removeEventListener('animationend', onMaskAnimationEnd)
  }, [open])
  return <MaskDiv ref={maskRef} open={open}>{children}</MaskDiv>
}

Mask.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onShow: PropTypes.func,
  onHide: PropTypes.func
}
