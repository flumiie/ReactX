import { Styled } from 'styled-components'
import { D_HEIGHT } from '../../models/dimensions'

export const Container = Styled.View`
  flex: 1;
  width: D_WIDTH;
`
export const SafeAreaContainer = Styled.SafeAreaView`
  flex: 1;
  width: D_WIDTH;
`

export const Components = Styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`

export const CardEntry = Styled.CardItem`
  background-color: transparent;
`// #694FAD

export const CardImage = Styled.ImageBackground`
  flex: 1;
  height: 200;
  margin: -16;
`

export const Gradient = Styled.LinearGradient`
  position: absolute;
  width: 100%;
  padding: 7;
  paddingTop: 15;
  bottom: 0;
  borderBottomLeftRadius: 5;
  borderBottomRightRadius: 5;
`

export const Carousel = Styled.carouselItem`
  height: ${D_HEIGHT - D_HEIGHT / 5};
`

export const Title = Styled.Text`
  color: white;
  fontSize: 20;
  fontWeight: bold;
`

export const Subtitle = Styled.Text`
  color: white;
  fontSize: 17;
`

export const ComingSoon = Styled.Text`
  position: absolute;
  left: 5;
  bottom: 5;
  color: #CCC;
`

export const ErrorHeader = Styled.Text`
  textAlign: center;
  textTransform: uppercase;
  fontWeight: bold;
  fontSize: 30;
  marginBottom: 10;
`

export const ErrorText = Styled.Text`
  textAlign: center;
  marginBottom: 10;
`