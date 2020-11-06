import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import ChevronLeft from '@material-ui/icons/ChevronLeftSharp'
import ChevronRight from '@material-ui/icons/ChevronRightSharp'
import Menu from '@material-ui/icons/MenuSharp'

export type { SvgIconProps as IconProps }
type SvgIconComponent = typeof SvgIcon

/**
 * Icons component exports relevant icons for the project
 */
export const Icons: {
  [key: string]: SvgIconComponent
} = {
  ChevronLeft,
  ChevronRight,
  Menu,
}
