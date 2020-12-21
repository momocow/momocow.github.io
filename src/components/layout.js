// eslint-disable-next-line import/no-webpack-loader-syntax
import noScriptCss from 'file-loader!../assets/css/noscript.css'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { Helmet, useI18next } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'
import React from 'react'
import { ExternalLink } from 'react-external-link'
import 'react-tiny-fab/dist/styles.css'
import '../assets/css/main.css'
import logo from '../assets/images/logo.svg'
import { TWITTER_HANDLE, USERNAME } from '../config'

export function Layout({ children }) {
  const { defaultLanguage, languages, language, t, siteUrl } = useI18next()

  return (
    <>
      <GatsbySeo
        title={t('title')}
        description={t('description', { joinArrays: '' })}
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
          title: t('title'),
          locale: language,
          description: t('description'),
          images: [
            {
              url: window.location.origin + '/favicon.svg',
              width: 150,
              height: 150,
              alt: 'logo'
            }
          ],
          profile: {
            firstName: t('firstName'),
            lastName: t('lastName'),
            username: USERNAME,
            gender: 'male'
          }
        }}
      />
      <Helmet>
        <link rel="icon" type="image/png" href={logo}></link>
        <noscript>{`<link rel="stylesheet" href="${noScriptCss}" />`}</noscript>
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
