import { combineReducers } from 'redux';
import gameReducer from './gameSlice';

const rootReducer = combineReducers({
    game: gameReducer
});

export default rootReducer;