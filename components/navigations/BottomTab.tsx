import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { NavigationActions } from 'react-navigation';
import { NavigationProps } from '../..';

import
{
  BottomNavigation,
  BottomNavigationTab
} from 'react-native-ui-kitten'
import { Rockets } from '../screens/Rockets'
import { Settings } from '../screens/Settings'

const BottomNavigations = ({ navigation }: NavigationProps) =>
{
  let index = 0
  const onTabSelect = (index: any) =>
  {
    // const { [index]: selectedRoute } = navigation.state.routes;
    // if(navigation)
    //   navigation.dispatch(
        NavigationActions.navigate({ routeName: 'Settings' })
      // );
  }

  return (
    <BottomNavigation
      selectedIndex={index}
      onSelect={onTabSelect}
    >
      <BottomNavigationTab title='Rockets' />
      <BottomNavigationTab title='Settings' />
    </BottomNavigation>
  )
}

export const BottomTabNavigator = createBottomTabNavigator({
  Rockets: Rockets,
  Settings: Settings,
}, {
  initialRouteName: 'Rockets',
  tabBarComponent: BottomNavigations,
})

BottomNavigations.navigationOptions = {
  title: 'Rockets'
}

export default BottomNavigations