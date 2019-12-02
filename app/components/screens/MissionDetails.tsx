import React from 'react'
import
{
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  Easing,
  Image
} from 'react-native'
import { Spinner, Container } from 'native-base'
import { Query } from 'react-apollo'
import
{
  D_HEIGHT,
  D_WIDTH
} from '../../models/dimensions'
import { GET_MISSION_DETAILS } from '../../models/queries/missions'

import { rocketImage } from './Rockets'

const MissionDetails = (props: any) =>
{
  const missionID = props.navigation.state.params.missionID
  
  return (
    <Query
      query={GET_MISSION_DETAILS}
      variables={{ mission_id: missionID }}
    >
      {
        (res: any) =>
        {
          if(res.loading && !res.data)
            return (
              <View style={styles.loadingContainer}>
                <View style={styles.loadStatus}>
                  <Spinner color='blue'/>
                </View>
              </View>
            )

          const item = res.data.mission
          const manufacturers = item.manufacturers.map((data: any, index: any) =>
          {
            return ('\n' + data)
          })
          const payload_ids = item.payload_ids.map((data: any, index: any) =>
          {
            return ('\n' + data)
          })

          return (
            <ScrollView>
              <Container style={styles.container}>
                <Image
                  source={rocketImage(item.mission_id)}
                  resizeMode='cover'
                  width={D_WIDTH}
                  height={D_WIDTH}
                />
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Mission ID: </Text>
                  {item.mission_id}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Mission Name: </Text>
                  {item.mission_name}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Manufacturers:</Text>
                  {manufacturers}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Payload IDs:</Text>
                  {payload_ids}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Wikipedia: </Text>
                  {item.wikipedia}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Website: </Text>
                  {item.website}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={{fontWeight: "bold"}}>Twitter: </Text>
                  {item.twitter}
                </Text>
                <Text style={[styles.itemText, item.description ? styles.descriptionText : styles.errorText]}>
                  <Text style={{fontWeight: "bold"}}>Description: </Text>{item.description}
                </Text>
              </Container>
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
    flex: 1,
  },
  loadingContainer:
  {
    flex: 1,
    width: D_WIDTH
  },
  loadStatus:
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
  itemText:
  {
    marginBottom: 10,
    fontSize: 20,
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

MissionDetails.navigationOptions = ({ navigation }) => (
{
  title: 'Mission Details',
})

export default MissionDetails