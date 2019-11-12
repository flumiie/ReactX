import React from 'react'
import
{
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Text
} from 'react-native'
import { Spinner } from 'native-base'

import { GET_PREVIOUS_LAUNCHES } from '../../models/queries/launchesPast'

import { D_WIDTH, D_HEIGHT } from '../../models/dimensions'
import { Query } from 'react-apollo'

export const Launches = () =>
{
  const _renderItem = ({item}) =>
  {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemText}>Active: {item.active.toString()}</Text>
        <Text style={styles.itemText}>First Flight: {item.first_flight}</Text>
        <Text style={styles.itemText}>Company: {item.company}</Text>
        <Text style={styles.itemText}>Country: {item.country}</Text>
        {/* <Text style={styles.itemText}>Diameter: {item.diameter}</Text> */}
        {/* <Text style={styles.itemText}>Engines: {item.engines}</Text> */}
        <Text style={styles.itemText}>Cost per Launch: {item.cost_per_launch}</Text>
        <Text style={styles.itemText}>Boosters: {item.boosters}</Text>
        <Text style={[styles.itemText, item.description ? styles.descriptionText : styles.errorText]}>
          Description: {item.description}
        </Text>
      </TouchableOpacity>
    )
  }
  
  return (
    <Query query={GET_PREVIOUS_LAUNCHES}>
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

          if(!res.data)
            return (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner}>
                  <Text>We're having trouble loading the data ...</Text>
                  <Text>Please try it again later</Text>
                </View>
              </View>
            )

          return (
            <ScrollView>
              <FlatList
                data={res.data}
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
