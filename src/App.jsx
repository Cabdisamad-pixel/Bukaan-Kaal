// import React from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppLayout from "./UI/AppLayout"
import GetAllNames from "./components/API/getAllNames"
import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import DataTable from "./components/Data-Table/DataTable"
import AddPatient from "./components/AddPatient/AddPatient"

const Router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <DataTable/>,
        path:"/"
        
      },
      {
        element: <AddPatient/>,
        path:"/AddPatient"

      }
    ]
  }
])

const App = () => {


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  })


  // useEffect(() => {

  //   const fetchNames = async () => {
  //     const data = await GetAllNames();
  //     console.log(data);
  //   }
  //   fetchNames();

  // }, []);










  // const x = 5


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router}/>
    </QueryClientProvider>
    
  )
}

export default App