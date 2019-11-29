/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native'
import App from './components/App'
import { name as Android } from './app.json'
import { name as iOS } from './app.ios.json'

AppRegistry.registerComponent(Platform.OS === 'ios' ? iOS : Android, () => App)
