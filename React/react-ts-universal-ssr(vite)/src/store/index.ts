import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import commonSlice from '@/store/common/commonSlice';

export type RootState = ReturnType<typeof store.getState>;
export type Selector<T> = (state: RootState) => T;

const createNoopStorage = () => {
  return {
    getItem(_key:string) {
      return Promise.resolve(null);
    },
    setItem(_key:string, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const reducers = combineReducers({
    commonSlice
});

const persistConfig = { 
  key: 'root', 
  storage, 
  whitelist:[] // ex) whitelist:['authSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
