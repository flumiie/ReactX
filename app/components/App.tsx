import React from 'react'

import { ApolloProvider } from 'react-apollo'
import client from './client'
import AppContents from './AppContents'

type Props = {}
const App = (): React.ReactFragment => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <AppContents/>
    </React.Fragment>
  </ApolloProvider>
)

export default App