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

import
{
  Container,
  SafeAreaContainer,
  Scrolly,
  Components,
  CardEntry, 
  CardImage, 
  Gradient,
  Title,
  Subtitle,
  ErrorHeader,
  ErrorText,
} from '../styles/styled'

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
          <CardEntry>
            <CardImage
              source={require('../../assets/images/falcon1.jpg')} //TODO: Missions images
              resizeMode='cover'
              borderRadius={5}
            >
              <Gradient
                colors={['black', '#ffffff00']}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 0, y: 0 }}
              >
                <Title>{item.mission_name}</Title>
                <Subtitle>{item.mission_id}</Subtitle>
              </Gradient>
            </CardImage>
          </CardEntry>
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
              <Container>
                <Components>
                  <Spinner color='blue' />
                </Components>
              </Container> 
            )

          if(res.error)
            return (
              <SafeAreaContainer>
                <Scrolly
                  refreshControl=
                  {
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh(res.refetch)}
                    />
                  }
                >
                  <View>
                    {
                      res.error.message.split(': ').map((err: any, i: any) =>
                        i == 0 ?
                          <ErrorHeader key={i}>{err.toString()}</ErrorHeader>
                          :
                          <ErrorText key={i}>{err.toString()}</ErrorText>
                      )
                    }
                    <ErrorText>
                      We're having trouble loading the data ..{'\n'}
                      Please try it again later
                    </ErrorText>
                  </View>
                </Scrolly>
              </SafeAreaContainer>
            )

          return (
            <SafeAreaView style={{ flex: 1 }}>
              <Scrolly
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
              </Scrolly>
            </SafeAreaView>
          )
        }
      }
    </Query>
  )
}

Missions.navigationOptions = ({ navigation }) => (
{
  title: 'Missions',
})

export default Missions