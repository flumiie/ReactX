import React from 'react'
import
{
  BottomNavigation,
  BottomNavigationTab
} from 'react-native-ui-kitten'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Rockets } from '../screens/Rockets'
import { Alert } from 'react-native'

export const BottomTab = (props) =>
{
  const onTabSelect = (selectedIndex) => {
    const { [index]: selectedRoute } = props.navigation.state.routes
    props.navigation.navigate(selectedRoute.routeName)
  }

  return (
    <BottomNavigation
      // selectedIndex={props.navigation.state.index}
      // onSelect={onTabSelect}
    >
      <BottomNavigationTab title='Rockets' />
      <BottomNavigationTab title='Settings' />
    </BottomNavigation>
  )
}

export const BottomTabNavigator = createBottomTabNavigator({
  Dashboard: Rockets,
  // Settings: Settings,
}, {
  initialRouteName: 'Dashboard',
  tabBarComponent: BottomTab,
})