import React, { useState } from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  ImageBackground,
  Image
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

const Rockets = (props: any) =>
{
  const [animatedCards, setAnimatedCards] = useState(true)

  const rocketImages = (id: any) =>
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
  
  const _renderFlatList = ({ item }) =>
  {
    return (
      <Content padder>
        <Card
          onPress={() => openRocketDetails(item.id, props.navigation)}
        >
          <CardItem style={styles.cardItem}>
            <ImageBackground
                source={rocketImages(item.id)}
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
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemText}>Is Active: {item.active == true ? 'Yes' : 'No'}</Text>
              </LinearGradient>
            </ImageBackground>
          </CardItem>
        </Card>
      </Content>
    )
  }

  const _renderCarousel = ({item, index}, parallaxProps: any) =>
  {
    return (
      <Content
        onTouchEnd={() => openRocketDetails(item.id, props.navigation)}
      >
        <View style={styles.carouselItem}>
          <ParallaxImage
            source={rocketImages(item.id)}
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
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemText}>Is Active: {item.active == true ? 'Yes' : 'No'}</Text>
          </LinearGradient>
          
        </View>
      </Content>
    )
  }
  
  return (
    <Query query={GET_ROCKETS}>
      {
        (res: any) =>
        {
          // if(err)
          //   return (
          //     <Text style={styles.errorText}>{err}</Text>
          //   )

          console.log(res)
          
          return null;
          // if(res.loading && !res.data)
          //   return (
          //     <View style={styles.loadingContainer}>
          //       <View style={styles.spinner}>
          //         <Spinner color='blue'/>
          //       </View>
          //     </View>
          //   )
          
          // return (
          //   <View>
          //     <ScrollView style={styles.scrollViewContainer}>
          //       {
          //         animatedCards
          //         ?  <Carousel
          //               // ref={(c) => { this._carousel = c; }}
          //               data={res.data.rockets}
          //               renderItem={_renderCarousel}
          //               sliderWidth={D_WIDTH}
          //               itemWidth={D_WIDTH/1.2}
          //               hasParallaxImages={true}
          //             />
          //         : <FlatList
          //             data={res.data.rockets}
          //             renderItem={(item) => _renderFlatList(item)}
          //           />
          //       } 
          //     </ScrollView>
          //     <View style={styles.buttonContainer}>
          //       <AwesomeButton
          //         height={35}
          //         onPress={() =>
          //           {
          //             if(animatedCards) setAnimatedCards(false)
          //             else setAnimatedCards(true)
          //           }
          //         }
          //       >
          //         {
          //           animatedCards
          //           ? 'Animated'
          //           : 'Flat'
          //         }
          //       </AwesomeButton>
          //     </View>
          //   </View>
          // )
        }
      }
    </Query>
  )
}

const styles = StyleSheet.create(
{
  spinner:
  {
    display: 'flex',
    alignItems: 'center',
    marginTop: D_HEIGHT / 2,
    transform:
    [
      { translateY: -D_HEIGHT / 12.5 }
    ]
  },
  
  loadingContainer:
  {
    flex: 1,
    width: D_WIDTH
  },
  scrollViewContainer:
  {
    height: '100%'
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
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Platform.select(
    {
      ios: 'Chalkboard SE',
      android: 'sans-serif-condensed'
    })
  },

  errorText:
  {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: Platform.select(
    {
      ios: 'Chalkboard SE',
      android: 'sans-serif-condensed'
    }),
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