import React from 'react'
import { StyleSheet } from 'react-native'

import Navigator from './navigations/Navigator'
import { Container } from 'native-base'
// import Rockets from './screens/Rockets'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
// const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
//   <Icon {...style} name='heart'/>
// )

const AppContents = () =>
{
  return (
    <Container>
      <Navigator/>
    </Container>
  )
}

export default AppContents