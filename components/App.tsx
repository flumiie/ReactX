import React from 'react'

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

export default App