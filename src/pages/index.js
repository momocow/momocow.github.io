import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { ExternalLink } from 'react-external-link'
import { Helmet } from 'react-helmet-async'
import { config as presets } from 'react-spring'
/**
 * @see {@link https://github.com/WinterCore/react-text-transition/issues/21}
 */
import TextTransition from 'react-text-transition'
import { Action, Fab } from 'react-tiny-fab'
import { Layout } from '../components/layout'
import { Mask } from '../components/mask'

// const canShare = typeof navigator.share === 'function'
const canShare = false

async function share(options) {
  try {
    await navigator.share(options)
  } catch (e) {
    if (!e.toString().startsWith('AbortError')) {
      alert(e)
    }
  }
}

async function shareQrcode() {
  // const { t } = useTranslation()
  try {
    const resp = await fetch('qrcode.svg')
    const imgFile = new File([await resp.blob()], location.hostname + '.svg', {
      type: resp.headers.get('Content-Type') || 'image/svg+xml'
    })
    try {
      alert(await imgFile.text())
      await navigator.share({ files: [imgFile] })
    } catch (e) {
      if (!e.toString().startsWith('AbortError')) {
        alert(e)
      }
    }
  } catch (e) {
    alert(e)
  }
}

const shareUrl = () => share({ url: location.origin })

export default function Portfolio({ data }) {
  const { t } = useTranslation()

  const defaultFlipped =
    typeof location === 'undefined'
      ? false
      : new URLSearchParams(location.hash).has('me')

  const [flipped, setFlipped] = useState(defaultFlipped)
  const [masked, setMasked] = useState(false)

  const myName = t(flipped ? 'nickName' : 'fullName')

  return (
    <Layout ogImageSrc={data.avatar1.childImageSharp.fixed.src}>
      <Helmet>
        <title>{myName}</title>
      </Helmet>
      <section id="main">
        <header>
          <span className="avatar" onClick={() => setFlipped(!flipped)}>
            <ReactCardFlip isFlipped={flipped}>
              <Img fixed={data.avatar1.childImageSharp.fixed} />
              <Img fixed={data.avatar2.childImageSharp.fixed} />
            </ReactCardFlip>
          </span>
          <h1>
            {
              /**
               * @see {@link https://github.com/WinterCore/react-text-transition/issues/21}
               */
              typeof window !== 'undefined' ? (
                <TextTransition
                  text={myName}
                  inline
                  direction="down"
                  springConfig={presets.wobbly}
                />
              ) : null
            }
          </h1>
          <p>{t('subtitle')}</p>
        </header>

        <div className="description">
          {t('description', { joinArrays: '' })}
        </div>

        <footer>
          <ul className="icons">
            <li>
              <ExternalLink
                href="https://github.com/momocow"
                className="icon brands fa-github"
              >
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href="https://www.instagram.com/_momocow_/"
                className="icon brands fa-instagram"
              >
                Instagram
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href="https://twitter.com/_momocow_"
                className="icon brands fa-twitter"
              >
                Twitter
              </ExternalLink>
            </li>
          </ul>
        </footer>
        {canShare ? (
          <div onClick={() => setMasked(!masked)}>
            <Fab
              mainButtonStyles={{
                backgroundColor: '#ffffff94',
                boxShadow: 'none'
              }}
              style={{
                top: '-24px',
                right: '-24px'
              }}
              icon={<i className="fa fa-share-alt" />}
              event="click"
              alwaysShowTitle
            >
              <Action
                text={t('share.url')}
                style={{ backgroundColor: '#ffffff94' }}
                onClick={() => shareUrl().then(() => setMasked(false))}
              >
                <i className="fa fa-link" />
              </Action>
              <Action
                text={t('share.qrcode')}
                style={{ backgroundColor: '#ffffff94' }}
                onClick={() => shareQrcode().then(() => setMasked(false))}
              >
                <i className="fa fa-qrcode" />
              </Action>
            </Fab>
          </div>
        ) : null}
        <Mask open={masked} />
      </section>
    </Layout>
  )
}

const avatarPropType = {
  childImageSharp: PropTypes.shape({
    fixed: PropTypes.shape({
      src: PropTypes.string
    })
  })
}

Portfolio.propTypes = {
  data: PropTypes.shape({
    avatar1: PropTypes.shape(avatarPropType),
    avatar2: PropTypes.shape(avatarPropType)
  })
}

export const query = graphql`
  query {
    avatar1: file(relativePath: { eq: "avatar1.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    avatar2: file(relativePath: { eq: "avatar2.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
