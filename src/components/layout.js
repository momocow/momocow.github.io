import { graphql, useStaticQuery } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { Helmet, useI18next } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'
import React from 'react'
import { ExternalLink } from 'react-external-link'
import HTMLComment from 'react-html-comment'
import '../assets/css/main.css'
import 'animate.css/animate.min.css'
import logo from '../assets/images/logo.svg'
import { TWITTER_HANDLE, USERNAME } from '../config'

const license = `
Identity by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
`

export function Layout({ children }) {
  const { defaultLanguage, languages, language, t, siteUrl } = useI18next()
  const origin = new URL(siteUrl).origin

  const data = useStaticQuery(graphql`
    query {
      avatarCow: file(relativePath: { eq: "avatar-cow.png" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const title = t('title', { name: t('nickName') })
  const description = t('description', { joinArrays: '' })

  return (
    <>
      <HTMLComment text={license} />
      <GatsbySeo
        title={title}
        description={description}
        language={language}
        canonical={siteUrl}
        languageAlternates={languages.map(lng => ({
          hrefLang: lng,
          href: lng !== defaultLanguage ? `/${lng}/` : '/'
        }))}
        twitter={{
          cardType: 'summary',
          handle: `@${TWITTER_HANDLE}`,
          site: `@${TWITTER_HANDLE}`
        }}
        openGraph={{
          url: siteUrl,
          type: 'website',
          title,
          locale: language,
          description,
          images: [
            {
              url: origin + data.avatarCow.childImageSharp.fixed.src,
              width: 150,
              height: 150,
              alt: 'logo'
            }
          ]
        }}
      />
      <Helmet>
        <link rel="icon" href={logo} sizes="any" type="image/svg+xml" />
        <noscript>{`<link rel="stylesheet" href="/noscript.css" />`}</noscript>
      </Helmet>
      <div id="wrapper">
        {children}
        <footer id="footer">
          <ul className="copyright">
            <li>
              <ExternalLink href="https://github.com/momocow">
                &copy; {USERNAME}
              </ExternalLink>
            </li>
            <li>
              Design:{' '}
              <ExternalLink href="http://html5up.net">HTML5 UP</ExternalLink>
            </li>
          </ul>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
