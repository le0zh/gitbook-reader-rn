import { Navigation } from 'react-native-navigation';

import Home from './Home';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('app.Home', () => Home);
}
