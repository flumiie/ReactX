import { styled } from 'styled-components'
import { D_HEIGHT } from '../../models/dimensions'

export const Container = styled.View`
  flex: 1;
  width: D_WIDTH;
`
export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  width: D_WIDTH;
`

export const Scrolly = styled.ScrollView.attrs(
{
  contentContainerStyle: (props: any) =>
  {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})``

export const Components = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`

export const CardEntry = styled.CardItem`
  background-color: transparent;
`// #694FAD

export const CardImage = styled.ImageBackground`
  flex: 1;
  height: 200;
  margin: -16;
`

export const Gradient = styled.LinearGradient`
  position: absolute;
  width: 100%;
  padding: 7;
  paddingTop: 15;
  bottom: 0;
  borderBottomLeftRadius: 5;
  borderBottomRightRadius: 5;
`

export const Carousel = styled.carouselItem`
  height: ${D_HEIGHT - D_HEIGHT / 5};
`

export const Title = styled.Text`
  color: white;
  fontSize: 20;
  fontWeight: bold;
`

export const Subtitle = styled.Text`
  color: white;
  fontSize: 17;
`

export const ComingSoon = styled.Text`
  position: absolute;
  left: 5;
  bottom: 5;
  color: #CCC;
`

export const ErrorHeader = styled.Text`
  textAlign: center;
  textTransform: uppercase;
  fontWeight: bold;
  fontSize: 30;
  marginBottom: 10;
`

export const ErrorText = styled.Text`
  textAlign: center;
  marginBottom: 10;
`