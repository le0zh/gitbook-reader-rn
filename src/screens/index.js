import { Navigation } from 'react-native-navigation';

import Home from './Home';
import BookDetail from './BookDetail';
import OnlineReader from './OnlineReader';
import CoverHeader from './BookDetail/CoverHeader';
import Empty from './Empty';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('app.Home', () => Home);
  Navigation.registerComponent('app.BookDetail', () => BookDetail);
  Navigation.registerComponent('app.BookDetail.Cover', () => CoverHeader);
  Navigation.registerComponent('app.OnlineReader', () => OnlineReader);
  Navigation.registerComponent('app.Empty', () => Empty);
}
