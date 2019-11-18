import React from 'react'
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
  const _renderItem = ({ item }) =>
  {
    const rocketImages = () =>
    {
      /**
       * Dynamic names for require()
       * in React Native is not yet supported
       */
      if(item.id == 'falcon1')
        return require('../../assets/images/falcon1.jpg')
      if(item.id == 'falcon9')
        return require('../../assets/images/falcon9.jpg')
      if(item.id == 'falconheavy')
        return require('../../assets/images/falconheavy.jpg')
      if(item.id == 'starship')
        return require('../../assets/images/starship.jpg')
    }

    return (
      <Content padder>
        <Card
          onPress={() => openRocketDetails(item.id, props.navigation)}
        >
          <CardItem style={styles.cardItem}>
            <ImageBackground
                source={rocketImages()}
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
  
  return (
    <Query query={GET_ROCKETS}>
      {
        (res: any) =>
        {
          // if(err)
          //   return (
          //     <Text style={styles.errorText}>{err}</Text>
          //   )
          
          if(res.loading && !res.data)
            return (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner}>
                  <Spinner color='blue'/>
                </View>
              </View>
            )
          
          return (
            <ScrollView>
              <FlatList
                data={res.data.rockets}
                renderItem={(item) => _renderItem(item)}
              />
            </ScrollView>
          )
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