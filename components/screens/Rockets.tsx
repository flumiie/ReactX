import React from 'react'
import { Query } from 'react-apollo'
import { ScrollView, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native'

import { GET_ROCKETS } from '../../models/queries/rockets'

export const Rockets = () =>
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
    <ScrollView>
      <Query query={GET_ROCKETS}>
        {
          ({res, err}) =>
          {
            if(err)
              return (
                <Text style={styles.errorText}>{err}</Text>
              )
      
            if(res.loading && !res.data)
              return (
                <Text>Loading ...</Text>
              )
            
            return (
              <FlatList
                data={res.data.rockets}
                renderItem={(item) => _renderItem(item)}
              />
            )
          }
        }
      </Query>
    </ScrollView>
  )
}

const styles = StyleSheet.create(
{
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
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black'
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
