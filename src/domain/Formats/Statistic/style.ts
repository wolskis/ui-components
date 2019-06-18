import styled from 'styled-components'

import { Props, Variables } from '../../../common'
import { styleForTypographyType } from '../../Typographies/services/textStyles'

const PrefixText = styled.span`
  color: ${Variables.Color.n800};
  margin-right: ${Variables.Spacing.sXSmall}px;
  font-weight: ${Variables.FontWeight.fwSemiBold};

  ${styleForTypographyType(Props.TypographyType.Heading)}
`

const TitleText = styled.div`
  margin-bottom: ${Variables.Spacing.s2XSmall}px;

 ${styleForTypographyType(Props.TypographyType.Small)}
`

const ValueText = styled.span`
  color: ${Variables.Color.n800};
  font-weight: ${Variables.FontWeight.fwSemiBold};

 ${styleForTypographyType(Props.TypographyType.Display)}
`

export {
  PrefixText,
  TitleText,
  ValueText
}
