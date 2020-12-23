import { useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Mask } from './mask'
import Img from 'gatsby-image'
import clsx from 'clsx'

const QrcodeDiv = styled.div`
  height: 266px;
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
  const data = useStaticQuery(graphql`
    query {
      qrcode: file(relativePath: { eq: "qrcode.png" }) {
        childImageSharp {
          fixed(width: 250, height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const [masked, setMasked] = useState(false)
  const [shown, setShown] = useState(false)

  return (
    <>
      <QrcodeMask
        open={masked}
        style={{
          zIndex: shown || masked ? 1000 : -1,
          display: shown || masked ? 'block' : 'none'
        }}
        onShow={() => setShown(true)}
        onHide={() => setShown(false)}
        className={clsx({
          animate__animated: true,
          animate__faster: true,
          animate__fadeIn: masked && !shown,
          animate__fadeOut: !masked && shown
        })}
      >
        <QrcodeDiv>
          <Img fixed={data.qrcode.childImageSharp.fixed} />
        </QrcodeDiv>
      </QrcodeMask>
      <QrcodeA masked={masked} onClick={() => setMasked(!masked)} {...props}>
        <i className="fa fa-qrcode" />
      </QrcodeA>
    </>
  )
}
