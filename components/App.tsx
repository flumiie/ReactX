import React from 'react'
import { StyleSheet } from 'react-native'

import { ApolloProvider } from 'react-apollo'
import setup from './client'
import AppContents from './AppContents'

type Props = {}
const App = (): React.ReactFragment => (
  <ApolloProvider client={setup}>
    <React.Fragment>
      <AppContents/>
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