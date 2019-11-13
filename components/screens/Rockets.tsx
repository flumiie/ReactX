import React from 'react'
import
{
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Alert
} from 'react-native'
import { Spinner } from 'native-base'
import { Query } from 'react-apollo'

import { GET_ROCKETS } from '../../models/queries/rockets'

import { D_WIDTH, D_HEIGHT } from '../../models/dimensions'
import { NavigationActions } from 'react-navigation'

const openRocketDetails = (item: any, props) =>
{
  props.navigation.dispatch(
    NavigationActions.navigate(
    {
      routeName: 'RocketDetails',
      params:
      {
        id: item.id
      }
    })
  )
}

const Rockets = (props) =>
{
  const _renderItem = ({item}) =>
  {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => openRocketDetails(item, props)}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemText}>Active: {item.name}</Text>
        <Text style={styles.itemText}>First Flight: {item.active}</Text>
      </TouchableOpacity>
    )
  }
  
  return (
    <Query query={GET_ROCKETS} variables={{id: 'falcon9'}}>
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
  loadingContainer:
  {
    flex: 1,
    width: D_WIDTH
  },
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
  container:
  {
    flex: 1, //Instead of do 100% of height and width, just use flex: 1,
  },
  headerText:
  {
    fontSize: 30,
    marginTop: 30,
  },
  itemContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray'
  },
  itemText:
  {
    fontSize: 20,
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
  title: 'Rocket Details',

})

export default Rockets