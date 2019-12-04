import React, { useState, useCallback } from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  RefreshControl
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationActions } from 'react-navigation'
import
{
  Spinner,
  CardItem,
  Body,
  Content
} from 'native-base'
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_ROCKETS } from '../../models/queries/rockets'

import AwesomeButton from 'react-native-really-awesome-button/src/themes/bruce'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { Card } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

import
{
  Container,
  SafeAreaContainer,
  Scrolly,
  Components,
  CardEntry, 
  CardImage, 
  Gradient,
  Title,
  Subtitle,
  ErrorHeader,
  ErrorText,
  ComingSoon
} from '../styles/styled'

const openRocketDetails = (itemID: any, navigation: any) =>
{
  navigation.dispatch(
    NavigationActions.navigate(
      {
        routeName: 'RocketDetails',
        params:
        {
          rocketID: itemID
        }
      })
  )
}

export const rocketImage = (id: any) =>
{
  /**
   * Dynamic names for require()
   * in React Native is not yet supported
   */
  if(id == 'falcon1')
    return require('../../assets/images/falcon1.jpg')
  if(id == 'falcon9')
    return require('../../assets/images/falcon9.jpg')
  if(id == 'falconheavy')
    return require('../../assets/images/falconheavy.jpg')
  if(id == 'starship')
    return require('../../assets/images/starship.jpg')
}

const Rockets = (props: any) =>
{
  const [refreshing, setRefreshing] = useState(false)
  const [animatedCards, setAnimatedCards] = useState(true)

  const onRefresh = useCallback((refetch) =>
  {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [refreshing])

  const _renderFlatList = ({ item }) =>
  {
    const isActive = item.active === 'true' ? 'Yes' : 'No'

    return (
      <Content padder>
        <Card
          onPress={() => openRocketDetails(item.rocket_id, props.navigation)}
        >
          <CardEntry>
            <CardImage
              source={rocketImage(item.rocket_id)}
              resizeMode='cover'
              borderRadius={5}
            >
              <Gradient
                colors={['black', '#ffffff00']}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 0, y: 0 }}
              >
                <Title>{item.rocket_name}</Title>
                <Subtitle>Is Active: {isActive}</Subtitle>
              </Gradient>
            </CardImage>
          </CardEntry>
        </Card>
      </Content>
    )
  }

  const _renderCarousel = ({ item, index }, parallaxProps: any) =>
  {
    const isActive = item.active === 'true' ? 'Yes' : 'No'

    return (
      <TouchableOpacity
        onPress={() => openRocketDetails(item.rocket_id, props.navigation)}
      >
        <Carousel>
          <ParallaxImage
            source={rocketImage(item.rocket_id)}
            containerStyle={styles.carouselImageContainer}
            style={styles.parallaxImage}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Gradient
            colors={['black', '#ffffff00']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
          >
            <Title>{item.rocket_name}</Title>
            <Subtitle>Is Active: {isActive}</Subtitle>
          </Gradient>
        </Carousel>
      </TouchableOpacity>
    )
  }

  return (
    <Query query={GET_ROCKETS}>
      {
        (res: any) =>
        {
          if (res.loading && !res.data)
            return (
              <Container>
                <Components>
                  <Spinner color='blue' />
                </Components>
              </Container> 
            )
          
          if(res.error)
            return (
              <SafeAreaContainer>
                <Scrolly
                  refreshControl=
                  {
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh(res.refetch)}
                    />
                  }
                >
                  <View>
                    {
                      res.error.message.split(': ').map((err: any, i: any) =>
                        i == 0 ?
                          <ErrorHeader key={i}>{err.toString()}</ErrorHeader>
                          :
                          <ErrorText key={i}>{err.toString()}</ErrorText>
                      )
                    }
                    <ErrorText>
                      We're having trouble loading the data ..{'\n'}
                      Please try it again later
                    </ErrorText>
                  </View>
                </Scrolly>
              </SafeAreaContainer>
            )

          return (
            <SafeAreaView style={{ flex: 1 }}>
              <ComingSoon>3D stuffs coming soon ...</ComingSoon>
              <Scrolly
                refreshControl=
                {
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(res.refetch)}
                  />
                }
              >
                {
                  animatedCards
                    ? <Carousel
                        // ref={(c) => { this._carousel = c }}
                        data={res.data.rockets}
                        renderItem={_renderCarousel}
                        sliderWidth={D_WIDTH}
                        itemWidth={D_WIDTH / 1.2}
                        hasParallaxImages={true}
                      />
                    : <FlatList
                        style={{ width: D_WIDTH }}
                        data={res.data.rockets}
                        renderItem={_renderFlatList}
                      />
                }
              </Scrolly>
              <View style={styles.buttonContainer}>
                <AwesomeButton
                  height={35}
                  onPress={() =>
                    {
                    if(animatedCards) setAnimatedCards(false)
                    else setAnimatedCards(true)
                  }}
                >
                  {
                    animatedCards
                      ? 'Carousel'
                      : 'Flat'
                  }
                </AwesomeButton>
              </View>
            </SafeAreaView>
          )
        }
      }
    </Query>
  )
}

const styles = StyleSheet.create(
{
  buttonContainer:
  {
    position: 'absolute',
    bottom: 5,
    right: 5
  },

  parallaxImage:
  {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  carouselImageContainer:
  {
    flex: 1,
    marginTop: 7,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 8
  }
})

Rockets.navigationOptions = ({ navigation }) => (
{
  title: 'Rockets',
})

export default Rockets