import React from 'react'
import classNames from 'classnames'
import { StyledIcon } from './style'

export interface IconProps {
  /** FontAwesome or alternate name of the icon to display */
  type: string
  /** Multiplies icon size by this amount (max 5) */
  size?: 1 | 2 | 3 | 4 | 5
  /** Adds FontAwesome stacked class to icon */
  isStacked?: boolean
  /** Adds FontAwesome `fa-lg` class to icon */
  isLarge?: boolean
  /** Adds a class to reduce the font size of the icon */
  isSmall?: boolean
  /** Colour of the icon */
  color?: string
  /** Additional class name to pass to the icon */
  className?: string
  /** Adds FontAwesome `fa-spin` class to icon */
  isSpinning?: boolean
  /** Prepends fa- to `type`. Set to false to use non-FontAwesome icons */
  isFontAwesome?: boolean
}

export class Icon extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    type: '',
    isStacked: false,
    isLarge: false,
    isSmall: false,
    isSpinning: false,
    isFontAwesome: true
  }

  get sizeClass (): string {
    const {
      size,
      isStacked,
      isLarge
    } = this.props

    if (isLarge) {
      return `fa-lg`
    }

    if (size) {
      if (isStacked) {
        return `fa-stack-${size}x`
      }

      return `fa-${size}x`
    }

    return ''
  }

  get type (): string {
    const {
      isFontAwesome,
      type
    } = this.props

    if (isFontAwesome) {
      return `fa-${type}`
    }

    return type
  }

  get classNames (): string {
    const {
      className,
      isSpinning,
      isSmall
    } = this.props

    return classNames(
      className,
      'fa',
      this.type,
      this.sizeClass,
      {
        'fa-spin': isSpinning,
        'icon-small': isSmall
      }
    )
  }

  public render (): JSX.Element {
    const {
      color
    } = this.props

    return (
      <StyledIcon
        className={this.classNames}
        aria-hidden
        color={color}
      />
    )
  }
}
