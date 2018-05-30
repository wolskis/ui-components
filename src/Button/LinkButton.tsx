import React from 'react'
import {ButtonProps, buttonClass} from './ButtonHelper'
import {Anchor} from '../Anchor'

export interface LinkButtonProps extends ButtonProps {
  /** Weather the button is clickable or not*/
  disabled?: boolean
  /** Destination url */
  href?: string
}

export class LinkButton extends React.Component<LinkButtonProps> {
  public static defaultProps: LinkButtonProps = {
    disabled: false,
    type: 'neutral'
  }

  public render (): JSX.Element | null {
    const {
      children,
      disabled,
      href,
      ...props
    } = this.props

    return (
      <Anchor href={disabled ? '#' : href} {...props}>
        <span className={buttonClass(this.props, { disabled: disabled })}>
          {children}
        </span>
      </Anchor>
    )
  }
}
