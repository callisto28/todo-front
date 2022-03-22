import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer, {
  sliceName as userSliceName,
} from './reducers/user.reducer';
import todoReducer, {
  sliceName as todoSliceName,
} from './reducers/todo.reducer';
import { todoService } from '../services/todo.service';
import { persistStore, persistReducer, PURGE } from 'redux-persist';

const persistConfig = {
  key: 'persistStore',
  version: 1,
  storage: AsyncStorage,
  whitelist: [userSliceName, todoSliceName],
};

const rootReducer = combineReducers({
  ...userReducer,
  ...todoReducer,
  [todoService.reducerPath]: todoService.reducer,
});
// @ts-ignore: Unreachable code error
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(todoService.middleware);

    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
