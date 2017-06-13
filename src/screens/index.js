import { Navigation } from 'react-native-navigation';

import Home from './Home';
import BookDetail from './BookDetail';
import OnlineReader from './OnlineReader';
import CoverHeader from './BookDetail/CoverHeader';
import More from './More';
import Reader from './Reader';
import Download from './Download';
import Search from './Search';
import Camera from './Camera';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('app.Home', () => Home);
  Navigation.registerComponent('app.BookDetail', () => BookDetail);
  Navigation.registerComponent('app.BookDetail.Cover', () => CoverHeader);
  Navigation.registerComponent('app.OnlineReader', () => OnlineReader);
  Navigation.registerComponent('app.More', () => More);
  Navigation.registerComponent('app.Reader', () => Reader);
  Navigation.registerComponent('app.Download', () => Download);
  Navigation.registerComponent('app.Search', () => Search);
  Navigation.registerComponent('app.Camera', () => Camera);
}
