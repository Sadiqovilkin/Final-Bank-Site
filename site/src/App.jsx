import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import { ROUTES } from './routers/Router'
import { DataContextProvider } from './context/Context'


const routes = createBrowserRouter(ROUTES)
function App() {


  return (
    <>
    <DataContextProvider>

        <RouterProvider router={routes} />
        
    </DataContextProvider>
    </>
  )
}

export default App
