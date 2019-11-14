import React from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  View,
  Text
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Spinner } from 'native-base'
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_ROCKETS } from '../../models/queries/rockets'


const openRocketDetails = (item: any, navigation: any) =>
{
  navigation.dispatch(
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

const Rockets = (props: any) =>
{
  const _renderItem = ({ item }) =>
  {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => openRocketDetails(item, props.navigation)}>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        <Text style={styles.itemText}>Is Active: {item.active == true ? 'Yes' : 'No'}</Text>
      </TouchableOpacity>
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
  title: 'Rockets',
})

export default Rockets