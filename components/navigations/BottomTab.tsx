import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Rockets } from '../screens/Rockets'
import { Launches } from '../screens/Launches'

const BottomNavigator = createMaterialBottomTabNavigator(
{
  Rockets: { screen: Rockets },
  Launches: { screen: Launches },
},
{
  initialRouteName: 'Rockets',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
})
  
const Navigator = createAppContainer(BottomNavigator);

export default Navigator