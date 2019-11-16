import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Rockets from '../screens/Rockets'
import RocketDetails from '../screens/RocketDetails'
import Launches from '../screens/Launches'
import Missions from '../screens/Missions'

const BottomTabNavigator = createMaterialBottomTabNavigator(
{
  Rockets:
  {
    screen: Rockets,
    navigationOptions:
    {
      tabBarOnPress: ({ navigation, defaultHandler }) =>
      {
        const routeName = navigation.state.routeName
        console.log(navigation)
      },
    }
  },
  Launches:
  {
    screen: Launches,
  },
  Missions: { screen: Missions },
},
{
  initialRouteName: 'Rockets',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
})

const Screens = createStackNavigator(
{
  Main: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  RocketDetails:
  {
    screen: RocketDetails,
  },
},
{
  initialRouteName: 'Main',
  headerMode: 'screen'
})

export default createAppContainer(Screens)