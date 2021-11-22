import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigation from "./navigation/RootNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>

      <ToastContainer />
    </Provider>
  );
};

export default App;
