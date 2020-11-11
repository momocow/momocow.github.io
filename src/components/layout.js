import 'fontsource-roboto/300.css'
import 'fontsource-roboto/400.css'
import 'fontsource-roboto/500.css'
import 'fontsource-roboto/700.css'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useI18next } from 'gatsby-plugin-react-i18next'
import PropTypes from 'prop-types'
// import { Helmet } from 'react-helmet-async'
import React from 'react'

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
          description: t('metadata:description'),
          images: []
        }}
      />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
