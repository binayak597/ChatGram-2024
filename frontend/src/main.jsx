import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthContextPovider } from './context/AuthContext.jsx'
import Protected from './components/protected/Protected.jsx'
import store from './redux/store.js'
import {Provider} from "react-redux"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Protected><Home /></Protected>
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  //handling invalid routes
  {
    path: "*",
    element: <div>No Data Found</div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextPovider>
      <Provider store={store}>
        <RouterProvider router={router}  />
        <Toaster />
      </Provider>
    </AuthContextPovider>
    
  </React.StrictMode>,
)
