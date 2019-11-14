// 11:59 AM Screen for List of Missions

import React from 'react'
import
{
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
  View,
} from 'react-native'
import { Query } from 'react-apollo'
import { Spinner } from 'native-base'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_PREVIOUS_LAUNCHES } from '../../models/queries/launchesPast'
import { GET_MISSIONS } from '../../models/queries/missions'

const Missions = () =>
{
  const _renderItem = ({item}) =>
  {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Manufacturers: {item.manufacturers}</Text>
        <Text style={styles.itemText}>Twitter: {item.twitter}</Text>
        <Text style={styles.itemText}>Payloads: {item.payloads}</Text>
        <Text style={styles.itemText}>Wikipedia: {item.wikipedia}</Text>
        <Text style={styles.itemText}>Website: {item.website}</Text>
        <Text style={[styles.itemText, item.description ? styles.descriptionText : styles.errorText]}>
          Description: {item.description}
        </Text>
      </TouchableOpacity>
    )
  }
  
  return (
    <Query query={GET_MISSIONS}>
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
                data={res.data.missions}
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

export default Missions