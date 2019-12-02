import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Rockets from '../screens/Rockets'
import Launches from '../screens/Launches'
import Missions from '../screens/Missions'
import RocketDetails from '../screens/RocketDetails'
import MissionDetails from '../screens/MissionDetails';

const BottomTabNavigator = createMaterialBottomTabNavigator(
{
  Rockets:
  {
    screen: Rockets,
    // navigationOptions:
    // {
    //   tabBarOnPress: ({ navigation, defaultHandler }) => {},
    // }
  },
  Launches:
  {
    screen: Launches,
  },
  Missions:
  {
    screen: Missions,
  },
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
  MissionDetails:
  {
    screen: MissionDetails,
  }
},
{
  initialRouteName: 'Main',
  headerMode: 'screen'
})

export default createAppContainer(Screens)