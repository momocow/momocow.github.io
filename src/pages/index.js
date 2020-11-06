import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

export default function Portfolio() {
  const { t } = useTranslation()
  return <div>{t('metadata:name')}</div>
}
