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
import { hash } from '../config'

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

const IDENTITIES = [
  {
    id: 'cow',
    i18nKey: 'nickName',
    avatarKey: 'avatarCow'
  },
  {
    id: 'me',
    i18nKey: 'fullName',
    avatarKey: 'avatarMe'
  }
]

function getIdenetity() {
  for (let i = 0; i < IDENTITIES.length; i++) {
    const subject = IDENTITIES[i]
    if (hash.has(subject.id)) {
      return [subject, i]
    }
  }
  return [IDENTITIES[0], 0]
}

export default function Portfolio({ data }) {
  const { t } = useTranslation()

  const [defaultIdentity, defaultIdentityIndex] = getIdenetity()

  const [flipped, setFlipped] = useState(defaultIdentityIndex === 1)
  const [masked, setMasked] = useState(false)

  const currentIdentityIndex = Number(flipped)
  const myName = t(IDENTITIES[currentIdentityIndex].i18nKey)

  return (
    <Layout
      ogImageSrc={data[defaultIdentity.avatarKey].childImageSharp.fixed.src}
    >
      <Helmet>
        <title>{t('title', { name: myName })}</title>
      </Helmet>
      <section id="main">
        <header>
          <span className="avatar" onClick={() => setFlipped(!flipped)}>
            <ReactCardFlip isFlipped={flipped}>
              {IDENTITIES.map(s => (
                <Img
                  key={s.avatarKey}
                  fixed={data[s.avatarKey].childImageSharp.fixed}
                />
              ))}
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

const AvatarPropType = {
  childImageSharp: PropTypes.shape({
    fixed: PropTypes.shape({
      src: PropTypes.string
    })
  })
}

Portfolio.propTypes = {
  data: PropTypes.shape({
    avatarCow: PropTypes.shape(AvatarPropType),
    avatarMe: PropTypes.shape(AvatarPropType)
  })
}

export const query = graphql`
  query {
    avatarCow: file(relativePath: { eq: "avatar-cow.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    avatarMe: file(relativePath: { eq: "avatar-me.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
