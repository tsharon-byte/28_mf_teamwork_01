import { Box } from '@mui/material'
import classNames from 'classnames'
import TWithIconHOC, { IconPosition } from './types'
import styles from './styles.module.css'

const withIcon: TWithIconHOC =
  () =>
  WrappedComponent =>
  ({ icon, iconPosition = IconPosition.left, rootClassName, ...props }) =>
    (
      <Box className={classNames(styles.root, rootClassName)}>
        {iconPosition === IconPosition.left && icon}
        <WrappedComponent {...props} />
        {iconPosition === IconPosition.right && icon}
      </Box>
    )

export default withIcon
