import React from 'react'
import
{
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native'
import { Spinner } from 'native-base'
import { Query } from 'react-apollo'

import { GET_ROCKET_DETAILS } from '../../models/queries/rockets'

import { D_WIDTH, D_HEIGHT } from '../../models/dimensions'

const RocketDetails = (props: any) =>
{
  const rocketID = props.navigation.state.params.id

  const _renderItem = ({item}) =>
  {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Is Active: {
          item.active == true
          ? 'Active'
          : 'Not Active'
        }</Text>
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
      </View>
    )
  }
  
  return (
    <Query
      query={GET_ROCKET_DETAILS}
      variables={{ id: rocketID }}
    >
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

          console.log(props)
          
          return (
            <ScrollView>
              <FlatList
                data={res.data.rocket}
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

RocketDetails.navigationOptions = ({ navigation }) => (
{
  title: 'Rocket Details',
})

export default RocketDetails