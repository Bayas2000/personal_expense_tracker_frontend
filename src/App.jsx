import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import store, { persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { generateToken, messaging } from "./firebase_notification/firebase";

import React from "react";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

function App() {
  React.useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      if (payload?.notification) {
        toast(`${payload.notification.title}: ${payload.notification.body}`);
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Body />
      </PersistGate>
    </Provider>
  );
}

export default App;
