import {combineReducers} from 'redux';
import AppReducer, {appStateIF} from './AppReducer';
import NavigationReducer from './NavigationReducer';

export default combineReducers({app: AppReducer, nav: NavigationReducer});
