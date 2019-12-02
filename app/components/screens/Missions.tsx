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
import { GET_MISSIONS } from '../../models/queries/missions'
import { Card } from 'react-native-paper'

const openMissionDetails = (itemID: any, navigation: any) =>
{
  navigation.dispatch(
    NavigationActions.navigate(
      {
        routeName: 'MissionDetails',
        params:
        {
          missionID: itemID
        }
      })
  )
}

const Missions = (props: any) =>
{
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback((refetch) =>
  {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [refreshing])

  const _renderItem = ({ item }) =>
  {
    return (
      <Content padder>
        <Card
          onPress={() => openMissionDetails(item.mission_id, props.navigation)}
        >
          <CardItem style={styles.cardItem}>
            <ImageBackground
              source={require('../../assets/images/falcon1.jpg')} //TODO: Missions images
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
                <Text style={styles.itemTitle}>{item.mission_name}</Text>
                <Text style={styles.itemText}>{item.mission_id}</Text>
              </LinearGradient>
            </ImageBackground>
          </CardItem>
        </Card>
      </Content>
      // <TouchableOpacity style={styles.itemContainer}>
      //   <Text style={styles.itemText}>ID: {item.mission_id}</Text>
      //   <Text style={styles.itemText}>Name: {item.mission_name}</Text>
      //   <Text style={styles.itemText}>Manufacturers: {item.manufacturers}</Text>
      //   <Text style={styles.itemText}>Payload IDs: {item.payload_ids}</Text>
      //   <Text style={styles.itemText}>Wikipedia: {item.wikipedia}</Text>
      //   <Text style={styles.itemText}>Website: {item.website}</Text>
      //   <Text style={styles.itemText}>Twitter: {item.twitter}</Text>
      //   <Text style={[styles.itemText, item.description ? styles.descriptionText : styles.errorText]}>
      //     Description: {item.description}
      //   </Text>
      // </TouchableOpacity>
    )
  }
  
  return (
    <Query query={GET_MISSIONS}>
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

          if(!res.data)
            return (
              <View style={styles.loadingContainer}>
                <View style={styles.loadStatus}>
                  <Text>We're having trouble loading the data ...</Text>
                  <Text>Please try it again later</Text>
                </View>
              </View>
            )

          return (
            <SafeAreaView style={{ flex: 1 }}>
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
                <FlatList
                  style={{ width: D_WIDTH }}
                  data={res.data.missions}
                  renderItem={_renderItem}
                />
              </ScrollView>
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
    fontSize: 17,
    fontWeight: 'bold'
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

Missions.navigationOptions = ({ navigation }) => (
{
  title: 'Missions',
})

export default Missions