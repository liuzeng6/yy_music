import { RouterProvider } from 'react-router-dom'
import router from "./router/index.js"
import Player from './components/Player/index.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

function App() {
  return (
    <>
      <Provider store={store}>
        <Player />
          <RouterProvider router={router} />
      </Provider>
    </>
  )
}
import "./App.css"
export default App;


