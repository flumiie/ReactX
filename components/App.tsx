/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react'
import
{
  ImageProps,
  ImageStyle,
  StyleSheet,
  
} from 'react-native'
import Navigator from './navigations/BottomTab'

import { ApolloProvider } from 'react-apollo'
import setup from './client'

const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
  <Icon {...style} name='heart'/>
)

type Props = {}
const App = (): React.ReactFragment => (
  <ApolloProvider client={setup}>
    <React.Fragment>
        {/* <Text style={styles.text} category='h1'>
          Welcome to UI Kitten 😻
        </Text>
        <Text style={styles.text} category='s1'>
          Start with editing App.js to configure your App
        </Text>
        <Text style={styles.text} appearance='hint'>
          For example, try changing theme to Dark by simply changing an import
        </Text>
        <Button style={styles.likeButton} icon={HeartIcon}>
          LIKE
        </Button> */}
      <Navigator/>
    </React.Fragment>
  </ApolloProvider>
)

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // text:
  // {
  //   textAlign: 'center',
  // },
  // likeButton:
  // {
  //   marginVertical: 16,
  // },
})

export default App