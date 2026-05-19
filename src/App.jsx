// import React from 'react'

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import AppLayout from "./UI/AppLayout"
import { createBrowserRouter, RouterProvider } from "react-router"
import DataTable from "./components/Data-Table/DataTable"
import AddPatient from "./components/AddPatient/AddPatient"
import InfoForm from "./components/AddPatient/Forms/InfoForm"
import PatientTest from "./components/AddPatient/Forms/PatientTest"
import MedicalRecords from "./components/AddPatient/Forms/MedicalRecords"
import Products from "./components/Products/Products"
import PatientDetails from "./components/PatientDetails/PatientDetails"
import PatientInfo from "./components/PatientDetails/PatientInfo/PatientInfo"
import SumarryPatientDetail from "./components/PatientDetails/SumarryPatientDetail"
import OverView from "./components/PatientDetails/PatientInfo/OverView"
import Medications from "./components/PatientDetails/PatientInfo/Medication/Medications"
import History from "./components/PatientDetails/PatientInfo/History"
import SumarryWeeks from "./components/PatientDetails/PatientInfo/Medication/SumarryWeeks"
import WeekMedications from "./components/PatientDetails/PatientInfo/Medication/WeekMedications"
import { selectALlMedicalRecords } from "./API/medicalRecords"
import { Toaster } from "react-hot-toast"
import { useState } from "react"

const Router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <DataTable />,
        path: "/"

      },
      {
        element: <AddPatient />,
        path: "/AddPatient",
        children: [
          {
            element: <InfoForm />,
            path: "infoForm"
          },
          {
            element: <PatientTest />,
            path: "PatientTest"
          },
          {
            element: <MedicalRecords />,
            path: "MedicalRecords"
          }
        ]
      },
      {
        element: <Products />,
        path: '/products'
      },
      {
        element: <PatientDetails />,
        path: 'patientDetails',
        children: [
          {
            path: 'patients',
            element: <SumarryPatientDetail />
          },
          {
            path: 'patients/:id',
            element: <PatientInfo />,
            children: [
              {
                path: '',
                element: <OverView />
              },
              {
                path: 'overview',
                element: <OverView />
              },
              {
                path: 'medications',
                element: <Medications />,
                children: [
                  // {
                  //   path:'',
                  //   element:<SumarryWeeks/>
                  // },
                  {
                    path: 'weeks',
                    element: <SumarryWeeks />
                  },
                  {
                    path: 'weeks/:weekId',
                    element: <WeekMedications />
                  }
                ]
              },
              {
                path: 'history',
                element: <History />
              }
            ]
          }
        ]
      }
    ]
  }
])

const App = () => {



  let name = 'cabdisamad '
  console.log(name);

  name = 'maxamed'

  console.log(name);
  
  

  // const [count, setCount] = useState(true)


  // 1) count accessing 

  // console.log(count);
  



  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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

    <RouterProvider router={Router} />
    <Toaster  position="top-center" gutter={12} containerStyle={{margin:'4px'}} toastOptions={{
      success:{
        duration:3000,
        iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
      },
      error:{
        duration:5000
      },
      style:{
        padding:'0.5rem',
        fontSize:'1rem'
      }
    }}/>
  </QueryClientProvider>
  // <LoadingSpinner/>

)
}

export default App