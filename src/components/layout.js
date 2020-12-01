// eslint-disable-next-line import/no-webpack-loader-syntax
import noScriptCss from 'file-loader!../assets/css/noscript.css'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useI18next } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import '../assets/css/main.css'

export function Layout({ children }) {
  const { defaultLanguage, languages, language, t, siteUrl } = useI18next()
  return (
    <>
      <GatsbySeo
        title={t('metadata:name')}
        description={t('metadata:description')}
        language={language}
        canonical={siteUrl}
        languageAlternates={languages.map(lng => ({
          hrefLang: lng,
          href: lng !== defaultLanguage ? `/${lng}/` : '/'
        }))}
        twitter={{
          cardType: 'summary',
          handle: '@_momocow_',
          site: '@_momocow_'
        }}
        openGraph={{
          url: siteUrl,
          type: 'website',
          title: t('metadata:name'),
          locale: language,
          description: t('metadata:description'),
          images: [
            {
              url: window.location.origin + '/favicon.svg',
              width: 150,
              height: 150,
              alt: 'logo'
            }
          ],
          profile: {
            firstName: 'Tao',
            lastName: 'Cheng',
            username: '_momocow_',
            gender: 'male'
          }
        }}
      />
      <Helmet>
        <noscript>{`<link rel="stylesheet" href="${noScriptCss}" />`}</noscript>
      </Helmet>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
