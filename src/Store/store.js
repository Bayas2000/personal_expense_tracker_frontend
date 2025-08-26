// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import SideBarSlice from "./sidebarSlice";
import AuthUserSlice from "./AuthSlice";
import BannerSlice from "./Banner";
import themeSlice from "./themeSlice";
import GoalsSlice from "./Goals";
import GroupHeader from "./Groups/header";
import Groups from "./Groups/groupsList";

// Combine reducers
const rootReducer = combineReducers({
  sidebar: SideBarSlice,
  Auth: AuthUserSlice,
  banner: BannerSlice,
  theme: themeSlice,
  goals: GoalsSlice,

  // group
  groupHeader: GroupHeader,
  groups: Groups,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth" , "groups" , "sidebar"], // only persist the theme slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Export store and persistor
export const persistor = persistStore(store);
export default store;
