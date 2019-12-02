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
          <CardItem style={styles.cardItem}>
            <ImageBackground
              source={rocketImage(item.rocket_id)}
              style={styles.cardImage}
              resizeMode='cover'
              borderRadius={5}
            >
              <LinearGradient
                colors={['black', '#ffffff00']}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 0, y: 0 }}
                style={styles.textContainer}
              >
                <Text style={styles.itemTitle}>{item.rocket_name}</Text>
                <Text style={styles.itemText}>Is Active: {isActive}</Text>
              </LinearGradient>
            </ImageBackground>
          </CardItem>
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
        <View style={styles.carouselItem}>
          <ParallaxImage
            source={rocketImage(item.rocket_id)}
            containerStyle={styles.carouselImageContainer}
            style={styles.parallaxImage}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <LinearGradient
            colors={['black', '#ffffff00']}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
            style={styles.textContainer}
          >
            <Text style={styles.itemTitle}>{item.rocket_name}</Text>
            <Text style={styles.itemText}>Is Active: {isActive}</Text>
          </LinearGradient>
        </View>
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
              <View style={styles.loadingContainer}>
                <View style={styles.loadStatus}>
                  <Spinner color='blue' />
                </View>
              </View> 
            )
          
          if(res.error)
            return (
              <SafeAreaView style={styles.loadingContainer}>
                <ScrollView
                  contentContainerStyle={styles.loadStatus}
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
                        <Text
                          style={{
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginBottom: 10
                          }}
                          key={i}
                        >{err.toString()}</Text>
                        :
                        <Text
                          style={{
                            textAlign: 'center'
                          }}
                          key={i}
                        >{err.toString()}</Text>
                    )
                  }
                  </View>
                </ScrollView>
              </SafeAreaView>
            )

          return (
            <SafeAreaView style={{ flex: 1 }}>
              <Text
                style={{
                  position: 'absolute',
                  left: 5,
                  bottom: 5,
                  color: '#CCC'
                }}>3D stuffs coming soon ...</Text>
              <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
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
              </ScrollView>
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
  loadStatus:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingContainer:
  {
    flex: 1,
    width: D_WIDTH
  },
  scrollViewContainer:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer:
  {
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  itemContainer:
  {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'gray'
  },

  /**
   * Flat List
   */
  cardItem:
  {
    backgroundColor: 'transparent', //'#694FAD'
  },
  cardImage:
  {
    flex: 1,
    height: 200,
    margin: -16
  },

  /**
   * Snap Carousel
   */
  carouselItem:
  {
    height: D_HEIGHT - D_HEIGHT / 5,
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
  },

  textContainer:
  {
    position: 'absolute',
    width: '100%',
    padding: 7,
    paddingTop: 15,
    bottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  itemTitle:
  {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemText:
  {
    color: 'white',
    fontSize: 17
  },

  errorText:
  {
    fontSize: 20,
    fontWeight: '500',
    color: 'red'
  },
  descriptionText:
  {
    color: 'green',
  }
})

Rockets.navigationOptions = ({ navigation }) => (
{
  title: 'Rockets',
})

export default Rockets