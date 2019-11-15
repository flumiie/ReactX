import React from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import
{
  Spinner,
  Container,
  Grid,
  Col
} from 'native-base'
import AwesomeButton from "react-native-really-awesome-button";
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_ROCKETS } from '../../models/queries/rockets'

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
    return (
      <Container style={styles.itemContainer}>
          <Grid>
            <Col style={{width: '80%'}}>
              <Text style={styles.itemText}>Name: {item.name}</Text>
              <Text style={styles.itemText}>Is Active: {item.active == true ? 'Yes' : 'No'}</Text>
            </Col>
            <Col style={{width: '20%'}}>
              <AwesomeButton backgroundColor={'red'} onPress={() => openRocketDetails(item.id, props.navigation)}>Details</AwesomeButton>
            </Col>
          </Grid>        
      </Container>
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
  container:
  {
    // flex: 1, //Instead of do 100% of height and width, just use flex: 1,
  },
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
  headerText:
  {
    fontSize: 30,
    marginTop: 30,
  },
  itemContainer:
  {
    height: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'gray'
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