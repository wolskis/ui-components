import styled, { css } from 'styled-components'

import { Props, Utils, Variables } from '../../../common'
import { styleForMargins } from '../../Spacers/services/margins'
import { colorOptions } from '../services/colors'
import { cardButtonStyle, cardCollpaseAnimation, cardExpandAnimation } from '../services/style'
import { CardColors } from './Card'

import {
  StyledFlexContent
} from '../services/style'

interface IStyledExtraContentProps {
  isExpanded: boolean
  color: CardColors
}

interface IStyledCardProps {
  margins?: Props.IMargins
  color: CardColors
}

interface IStyledCardToggleButtonProps {
  isExpanded: boolean,
  hasParentHoverStyle: boolean
  color: CardColors
  hasHrefOrHandleClick?: boolean
}

interface IStyleActionButtonProps {
  hasRightMargin: boolean
  color: CardColors
}

interface IStyledCardHeader {
  isExpanded: boolean
  hasHoverStyle: boolean
  color: CardColors
  hasHrefOrHandleClick?: boolean
  expandable: boolean
}

const StyledCard = styled.div`
  margin: 0;

  ${(props: IStyledCardProps) => styleForMargins(props.margins)}

  background-color: ${(props: IStyledCardProps) => colorOptions[props.color].background};
`

const StyledHeaderContainer = styled.div`
  display: flex;
`

const StyledCardHeader = styled(StyledFlexContent)`
  position: relative;
  padding: ${Variables.Spacing.sMedium}px;
  border: 1px solid ${(props: IStyledCardHeader) => colorOptions[props.color].border};
  border-radius: ${Variables.Style.borderRadius}px;
  width: 100%;

  ${(props: IStyledCardHeader) => props.hasHoverStyle && css`
      cursor: pointer;

      &:hover {
        background-color: ${colorOptions[props.color].hoverBackground};
        transition: background-color .25s ease-out;
      }
  `}

  ${(props: IStyledCardHeader) => props.isExpanded && css`
      border-radius: ${Variables.Style.borderRadius}px ${Variables.Style.borderRadius}px 0 0;
  `}

  ${(props: IStyledCardHeader) => props.hasHrefOrHandleClick && props.expandable && css`
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
  `}
`

interface IStyledExpandableButtonSectionProps {
  isExpanded: boolean
  color: CardColors
}

const StyledExpandableButtonSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${Variables.Spacing.sMedium}px 0 ${Variables.Spacing.sMedium}px;
  border: 1px solid ${Variables.Color.n250};
  border-top-right-radius: ${Variables.Style.borderRadius}px;
  border-bottom-right-radius: ${Variables.Style.borderRadius}px;
  cursor: pointer;

  ${(props: IStyledExpandableButtonSectionProps) => css`
    &:hover  {
      color: ${Variables.Color.n800};
      background-color: ${colorOptions[props.color].hoverBackground};
      transition: background-color .25s ease-out;
    }
  `}

  ${(props: IStyledExpandableButtonSectionProps) => props.isExpanded && css`
    border-bottom-right-radius: 0;
  `}
`

const StyledCardToggleButton = styled.button`
  ${cardButtonStyle};
  transition: all .25s ease-out;
  z-index: 1;

  ${(props: IStyledCardToggleButtonProps) => props.isExpanded && css`
      transform: rotate(180deg);
      transition: all .25s ease-out;
  `}

  ${(props: IStyledCardToggleButtonProps) => props.hasParentHoverStyle && !props.hasHrefOrHandleClick && css`
    ${StyledCard}:hover & {
      color: ${Variables.Color.n800};
      background-color: ${colorOptions[props.color].hoverButtonBackground};
    }
  `}

  ${Utils.mediaQueryBetweenSizes({ maxPx: Variables.Breakpoint.breakpointTablet })} {
    ${(props: IStyledCardToggleButtonProps) => !props.hasHrefOrHandleClick && css`
      display: none;
    `}
  }
`

const StyledActionButton = styled.button<IStyleActionButtonProps>`
  ${cardButtonStyle};
  z-index: 1;

  &:hover {
    background-color: ${(props: IStyleActionButtonProps) => colorOptions[props.color].hoverButtonBackground};
  }

  ${(props: IStyleActionButtonProps) => props.hasRightMargin && css`
      margin-right: ${Variables.Spacing.sMedium}px;
  `}

  ${Utils.mediaQueryBetweenSizes({ maxPx: Variables.Breakpoint.breakpointTablet })} {
    margin-right: 0
  }
`

const StyledExtraContent = styled.div`
  padding: 0;
  height: auto;
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s;
  ${cardCollpaseAnimation}
  border: 1px solid ${Variables.Color.n250};
  border-top: 0;
  border-radius: 0 0 ${Variables.Style.borderRadius}px ${Variables.Style.borderRadius}px;
  background-color: ${(props: IStyledExtraContentProps) => colorOptions[props.color].extraContentBackground};

  ${(props: IStyledExtraContentProps) => props.isExpanded && css`
      max-height: 999px; // Magic number to keep animation working when expanding
      ${cardExpandAnimation}
  `}
`

const StyledBodyContents = styled.div`
  padding: ${Variables.Spacing.sMedium}px;
`

export {
  StyledBodyContents,
  StyledCard,
  StyledCardHeader,
  StyledExtraContent,
  StyledActionButton,
  StyledCardToggleButton,
  StyledExpandableButtonSection,
  StyledHeaderContainer
}
