/* eslint-disable security/detect-object-injection */
import { Box, makeStyles } from '@committed/components'
import clsx from 'clsx'
import React, {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { useLayout } from './Root'

export interface FooterProps {
  /**
   * Add a class name to the component, can be used for additional styling
   */
  className?: string
  /**
   * To add styling to the component
   */
  style?: CSSProperties
  /**
   * Change the component type used
   * @default footer
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>
  /**
   * The color used in the footer, can be keyed from the palette
   */
  color?: string
  /**
   * The background color used in the footer, can be keyed from the palette
   */
  bgcolor?: string
  children?: ReactNode
}

const useStyles = makeStyles(({ transitions }) => ({
  root: {
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

interface DumbProps {
  width: string
  marginLeft: number
  marginRight: number
}

/**
 * Footer with no layout knowledge
 */
export const DumbFooter: React.FC<FooterProps & DumbProps> = ({
  component: Component = 'footer',
  className,
  color,
  bgcolor,
  style,
  width,
  marginLeft,
  marginRight,
  ...props
}: FooterProps & DumbProps) => {
  const classes = useStyles()
  return (
    <Component
      className={clsx(className, classes.root)}
      style={{
        width,
        marginLeft,
        marginRight,
        ...style,
      }}
    >
      <Box color={color} bgcolor={bgcolor} {...props} />
    </Component>
  )
}

/**
 * The footer is to be used after the Content and will grow and shrink according to the current state of the Navigation
 */
export const Footer: React.FC<FooterProps> = ({
  className = '',
  component = 'footer',
  color = 'primary.contrastText',
  bgcolor = 'primary.main',
  style = {},
  ...props
}) => {
  const { currentNavWidth, footerResponse, navAnchor } = useLayout()

  const margin = {
    static: 0,
    squeezed: currentNavWidth,
    pushed: currentNavWidth,
  }[footerResponse]

  const marginLeft = navAnchor === 'left' ? margin : 0
  const marginRight = navAnchor === 'right' ? margin : 0

  const width = {
    static: '100%',
    squeezed: `calc(100% - ${currentNavWidth}px)`,
    pushed: '100%',
  }[footerResponse]

  return (
    <DumbFooter
      {...props}
      className={className}
      component={component}
      color={color}
      bgcolor={bgcolor}
      style={style}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
    />
  )
}
