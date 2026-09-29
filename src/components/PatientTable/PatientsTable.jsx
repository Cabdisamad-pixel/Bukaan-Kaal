import { useQuery } from "@tanstack/react-query";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useSearchParams } from "react-router";
import { GetPatientInfo, GetPatientsDataTable } from '../../API/PatientInfo';
import { BarLoader, ClimbingBoxLoader, ClipLoader, ClockLoader } from "react-spinners";

function PatientsTable() {


  const [searchPrams, setSearchPrams] = useSearchParams()



  const page = Number(searchPrams.get('page')) || 1


  const { data: patientsData, isLoading: patientsDataIsLoading, error: patientsDataError } = useQuery({
    queryKey: ['Patients', page],
    queryFn: () => GetPatientsDataTable(page)
  })

  console.log(patientsData)


  const PAGE_SIZE = 6;


  const pageCount = Math.ceil(patientsData?.PatientInfo?.length / PAGE_SIZE);

  console.log(pageCount)

  const nextPage = () => {
    if ((page * PAGE_SIZE) - 1 >= patientsData?.count) return
    searchPrams.set('page', page + 1);
    setSearchPrams(searchPrams)

    console.log('helloe')
  }
  const backPage = () => {
    searchPrams.set('page', page - 1);
    setSearchPrams(searchPrams)

    console.log('helloe')
  }


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-800">All bookings</h1>

          <div className="flex items-center gap-4">
            {/* Filter tabs */}
            <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
              <button className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium">
                All
              </button>
              <button className="px-4 py-1.5 rounded-md text-slate-600 text-sm font-medium hover:bg-slate-50">
                critical
              </button>
              <button className="px-4 py-1.5 rounded-md text-slate-600 text-sm font-medium hover:bg-slate-50">
                stable
              </button>
              <button className="px-4 py-1.5 rounded-md text-slate-600 text-sm font-medium hover:bg-slate-50">
                normal
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm text-sm text-slate-700 font-medium">
              <span>Sort by date (recent first)</span>
              <FiChevronDown className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table head */}
          <div className="grid grid-cols-[100px_1fr_1fr_140px_140px] bg-slate-50 px-6 py-3 text-xs font-semibold text-slate-500 tracking-wide">
            <div>ID</div>
            <div>NAME</div>
            <div>PHONE</div>
            <div>STATUS</div>
            <div>EMAIL</div>
          </div>


          { patientsDataIsLoading && 
            <div className="flex justify-center items-center h-40 w-100%">
            <BarLoader
                backgroundColor="#f3f3f3"
                color="#6366f1"
                height={'2.4rem'}
                borderRadius={'0.5rem'}
                width={'20rem'}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }


          {
            patientsData?.PatientInfo?.map((patient) => {
              console.log(patient)
              return (
                <div className="grid grid-cols-[100px_1fr_1fr_140px_140px] items-center px-6 py-4 border-t border-slate-100">
                  <div className="font-semibold text-slate-700">{patient.id}</div>
                  <div>
                    <div className="font-semibold text-slate-800">{patient.firstName} {patient.listName}</div>
                    <div className="text-sm text-slate-400">{patient.email}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-700"> + {patient.mobileNumber}</div>
                    {/* <div className="text-sm text-slate-400">May 11 2023 &mdash; May 14 2023</div> */}
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                      CRITICAL
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800">$1,050.00</div>
                </div>

              )
            })
          }

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold">{(page - 1) * PAGE_SIZE}</span> to{" "}
              <span className="font-semibold">{(page * PAGE_SIZE) - 1 >= patientsData?.count ? patientsData?.count : page * (PAGE_SIZE) - 1}</span> of{" "}
              <span className="font-semibold">{patientsData?.count}</span> results
            </div>
            <div className="flex items-center gap-4">
              <button onClick={backPage} className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800">
                <FiChevronLeft />
                Previous
              </button>
              <button onClick={nextPage} className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800">
                Next
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsTable;
