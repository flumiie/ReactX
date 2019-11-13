import React from 'react'
import
{
  StyleSheet,
  ImageStyle,
  ImageProps
} from 'react-native'
import
{
  Layout,
  Icon
} from 'react-native-ui-kitten'
import { Rockets } from './screens/Rockets'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
  <Icon {...style} name='heart'/>
)

const AppContents = () =>
{
  return (
    <Layout style={styles.container}>
      <Rockets/>
    </Layout>
  )
}

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AppContents