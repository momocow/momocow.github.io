import PropTypes from 'prop-types'

export const AvatarPropType = {
  childImageSharp: PropTypes.shape({
    fixed: PropTypes.shape({
      src: PropTypes.string
    })
  })
}
