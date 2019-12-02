import React from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  SafeAreaView
} from 'react-native'
import { Spinner } from 'native-base'
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_PREVIOUS_LAUNCHES } from '../../models/queries/launchesPast'

import
{
  Container,
  SafeAreaContainer,
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

const Launches = () =>
{
  const _renderItem = ({ item }) =>
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
              <Container>
                <View style={styles.contents}>
                  <ErrorHeader>Coming Soon</ErrorHeader>
                  <ErrorText>The queries will be on the way ...</ErrorText>
                </View>
              </Container>
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
  contents:
  {
    display: 'flex',
    alignItems: 'center',
    marginTop: D_HEIGHT / 2,
    transform:
    [
      { translateY: -D_HEIGHT / 12.5 }
    ]
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

export default Launches