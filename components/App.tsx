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
  StyleSheet
} from 'react-native'
import
{
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text
} from 'react-native-ui-kitten'
import
{
  mapping,
  light as theme,
} from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { BottomTab } from './navigations/BottomTab'

import { ApolloProvider } from 'react-apollo'; 
import
{
  ApolloClient,
  InMemoryCache,
  HttpLink
} from 'apollo-client-preset';
import { Rockets } from './screens/Rockets'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
  <Icon {...style} name='heart'/>
)
  
type Props = {}
const App = (): React.ReactFragment => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Layout style={styles.container}>
          <Rockets/>
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
        </Layout>
        <BottomTab/>
      </ApplicationProvider>
    </React.Fragment>
  </ApolloProvider>
)

const client = new ApolloClient(
{
  //Assign to your cache property a instance of a InMemoryCache
  cache: new InMemoryCache(),
  //Assign your link with a new instance of a HttpLink linking to your graphql server.
  link: new HttpLink(
  {
    uri: 'https://api.spacex.land/graphql/',
  })
})

const styles = StyleSheet.create(
{
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:
  {
    textAlign: 'center',
  },
  likeButton:
  {
    marginVertical: 16,
  },
})

export default App
