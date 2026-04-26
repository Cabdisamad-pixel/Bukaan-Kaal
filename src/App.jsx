// import React from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppLayout from "./UI/AppLayout"
import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import DataTable from "./components/Data-Table/DataTable"
import AddPatient from "./components/AddPatient/AddPatient"
import InfoForm from "./components/AddPatient/Forms/InfoForm"
import PatientTest from "./components/AddPatient/Forms/PatientTest"
import MedicalRecords from "./components/AddPatient/Forms/MedicalRecords"
import LoadingSpinner from "./UI/LoadingSpinner"
import Products from "./components/Products/Products"
import PatientDetails from "./components/PatientDetails/PatientDetails"

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
        path:"/AddPatient",
        children: [
          {
            element:<InfoForm/>,
            path:"infoForm"
          },
          {
            element: <PatientTest/>,
            path:"PatientTest"
          },
          {
            element: <MedicalRecords/>,
            path:"MedicalRecords"
          }
        ]
      },
      {
        element: <Products/>,
        path : 'products'
      },
      {
        element:<PatientDetails/>,
        path:'patientDetails'
      }
    ]
  }
])

const App = () => {


  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 1000
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
    // <LoadingSpinner/>
    
  )
}

export default App