import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${props =>
    props.open
      ? {
          backgroundColor: '#ffffff94',
          zIndex: 100
        }
      : {
          backgroundColor: 'transparent',
          zIndex: -1
        }}
`

// export function Mask({ open = false } = {}) {
//   return <div className={clsx({
//     mask: true, open
//   })}></div>
// }

Mask.propTypes = {
  open: PropTypes.bool.isRequired
}
