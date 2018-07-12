import React from 'react'
import { TextWrapper } from './style'
import { withSkeleton, SkeletonComponentProps } from '../Skeleton'

export interface TextProps {
  /** Text to display */
  children: string
  /** Custom class name to use */
  className?: string
  /** If true, displays the text in uppercase */
  isUpper?: boolean
  /** If true, displays the text with a heavy font weight */
  isHeavy?: boolean
  /** If true, displays the text in a smaller font size */
  isSmall?: boolean
  /** If true, displays the text in a larger font size */
  isLarge?: boolean
  /** If true, will truncate overflowing text */
  isTruncated?: boolean
  /** If true, will display the text inline */
  isInline?: boolean
  /** If true, displays the text with a gray colour */
  isSubtle?: boolean
  /** Color of the text */
  color?: string
}

export class TextComponent extends React.PureComponent<TextProps> {
  public static defaultProps: Partial<TextProps> = {
    isInline: true
  }

  public render (): JSX.Element {
    const {
      children,
      className,
      isHeavy,
      isUpper,
      isSmall,
      isLarge,
      isTruncated,
      isInline,
      isSubtle,
      color
    } = this.props

    return (
      <TextWrapper
        color={color}
        isInline={isInline}
        isHeavy={isHeavy}
        isUpper={isUpper}
        isSmall={isSmall}
        isLarge={isLarge}
        isTruncated={isTruncated}
        isSubtle={isSubtle}
        className={className}
      >
        {children}
      </TextWrapper>
    )
  }
}

export const Text: React.ComponentClass<TextProps & SkeletonComponentProps> = withSkeleton(TextComponent)
