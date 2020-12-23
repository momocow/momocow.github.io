import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Mask } from './mask'
import clsx from 'clsx'

import qrcodeSvg from '../assets/images/qrcode.svg'

import styled from 'styled-components'

const QrcodeImg = styled.img`
  width: 100%;
`

const QrcodeDiv = styled.div`
  width: 60%;
  margin: 20%;
  background-color: white;
  border-radius: 4px;
`

const QrcodeA = styled.a`
  z-index: 1000;
  border-radius: 4px;
  ${props => (props.masked ? { color: '#ff7496 !important' } : null)}
`

const QrcodeMask = styled(Mask)`
  border-radius: 4px;
`

export function QrcodeButton(props) {
  const [masked, setMasked] = useState(false)

  return (
    <>
      <QrcodeMask open={masked}>
        <QrcodeDiv>
          <QrcodeImg src={qrcodeSvg} />
        </QrcodeDiv>
      </QrcodeMask>
      <QrcodeA masked={masked} onClick={() => setMasked(!masked)} {...props}>
        <i className="fa fa-qrcode" />
      </QrcodeA>
    </>
  )
}
