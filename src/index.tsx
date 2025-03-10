import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@sonr-io/nebula-react/dist/esm/index.css"
import "@fontsource/manrope/400.css"
import "@fontsource/manrope/600.css"
import "@fontsource/manrope/800.css"
import Main from "./Main"
import reportWebVitals from "./reportWebVitals"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import { AppModalProvider } from "./contexts/appModalContext/appModalContext"
import { AppSettingsProvider } from "./contexts/appSettingsContext/appSettingsContext"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router } from "react-router-dom"
import theme from "./theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSettingsProvider>
        <AppModalProvider>
          <ChakraProvider theme={theme}>
            <Router>
              <Main />
            </Router>
          </ChakraProvider>
        </AppModalProvider>
      </AppSettingsProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
