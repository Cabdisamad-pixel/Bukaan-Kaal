import { useState } from "react";
import toast from "react-hot-toast";

import { FaCheck } from "react-icons/fa";
// import { GetMedications } from "../../../../API/medicalRecords";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { GetMedications, insertMedications } from "../../../../API/Medications";
import LoadingSpinner from "../../../../UI/LoadingSpinner";


const AddMedicationOverLay = ({ OnClose, onConfirm }) => {

  const queryClient = useQueryClient();

  // reading / getting id and week-number as a weekId to calculate this patient medications in the current week
  const { id, weekId } = useParams();

  // get medications that i record for this patient from data base and show them in the overlay to select from them and add new medication to the patient
  const { data: Medications, isLoading: MedicationsLoading } = useQuery({
    queryKey: ['medications', id, weekId],
    queryFn: () => GetMedications(parseInt(id), parseInt(weekId))
  })


  // insertingData Query

  const { mutate: insertMedication } = useMutation({
    mutationFn: insertMedications,
    onSuccess: (data) => {
      // console.log('Medication inserted successfully:', data.length);
      toast.success(`${data.length} Medication added successfully to the patient${id}`);

      // Invalidate the medications query to refetch the updated list
      queryClient.invalidateQueries(['medications', id, weekId]);

      // closing the overlay after successful insertion
      OnClose();
    },
    onError: (error) => {
      // displaying error message if there is an error while inserting data to database and also log the error to the console for debugging
      console.error('Error inserting medication:', error);

      // showing error message to the user using toast
      toast.error("Failed to add medication");
    },
  })


  // console.log(data?.length);

  const existingMedications = Medications?.length || 1;


  // 1) Fake data for intial States & testing
  const DRUGS = [
    {
      id: 1,
      name: "Amoxicillin",
      cls: "Antibiotic — Penicillin",
      cat: "antibiotic",
      doses: ["250mg", "500mg", "875mg"],
      frequencies: ["once", "twice daily", "three times daily"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 2,
      name: "Ibuprofen",
      cls: "NSAID Analgesic",
      cat: "analgesic",
      doses: ["200mg", "400mg", "600mg"],
      frequencies: ["once", "twice daily", "three times daily"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 3,
      name: "Metformin",
      cls: "Antidiabetic",
      cat: "supplement",
      doses: ["500mg", "850mg", "1000mg"],
      frequencies: ["once", "twice daily", "with meals"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 4,
      name: "Lisinopril",
      cls: "ACE Inhibitor",
      cat: "cardio",
      doses: ["5mg", "10mg", "20mg"],
      frequencies: ["once", "twice daily"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 5,
      name: "Azithromycin",
      cls: "Macrolide Antibiotic",
      cat: "antibiotic",
      doses: ["250mg", "500mg"],
      frequencies: ["once", "once daily for 3 days", "once daily for 5 days"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 6,
      name: "Paracetamol",
      cls: "Analgesic / Antipyretic",
      cat: "analgesic",
      doses: ["500mg", "1000mg"],
      frequencies: ["once", "twice daily", "three times daily", "four times daily"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 7,
      name: "Atorvastatin",
      cls: "Statin — Cardiovascular",
      cat: "cardio",
      doses: ["10mg", "20mg", "40mg"],
      frequencies: ["once", "once at night"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    },
    {
      id: 8,
      name: "Vitamin D3",
      cls: "Supplement",
      cat: "supplement",
      doses: ["1000IU", "2000IU", "5000IU"],
      frequencies: ["once", "once weekly", "once monthly"],
      routes: "oral",
      prescribedBy: "Dr Caaqil",
      indication: 'qandho jabin',
      note: "take when you sleep at night "
    }
  ];

  const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "antibiotic", label: "Antibiotics" },
    { key: "analgesic", label: "Analgesics" },
    { key: "cardio", label: "Cardiovascular" },
    { key: "supplement", label: "Supplements" },
  ];

  // 2) initalization for mandatory States
  const [selectedDrugs, setSelectedDrugs] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Finally array that i will put the values to pass in data base 
  // const [finallHandDrugs, setFinallHandDrugs] = useState([]);
  // this was the final array that i will send to the database but i will not use state for it because i will create it in the handle confirm function and send it to the database directly without the need to store it in the state because i will not use it anywhere else in the component and storing it in the state will cause unnecessary re-renders when i change the dose or frequency of a drug


  // category handler to filter drugs by category and show only the drugs that belong to the selected category and if the category is all show all drugs 

  const categoryHandler = (category) => {
    setCategoryFilter(category);
  }


  // filter drugs by category and search term

  const filteredDrugs = DRUGS.filter((drug) => {
    const categoryMatch = drug.cat === categoryFilter || categoryFilter === 'all';
    const matchSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '';
    return categoryMatch && matchSearch;

  })

  // handle drug select and unselect

  const handleDrugSelect = (drugId, drug) => {
    setSelectedDrugs((prev) => {
      const NextDrug = { ...prev }
      if (NextDrug[drugId]) delete NextDrug[drugId]
      else NextDrug[drugId] = drug
      return NextDrug
    })
  }


  // handle dose change
  const handleDoseChange = (drugId, passedDose) => {

    if (!selectedDrugs[drugId]) return toast.error("Please select the drug first than change the dose if you want ") // if drug is not selected, do nothing and show error message

    setSelectedDrugs((prev) => {
      // console.log("before:", prev[drugId]);
      const nextDrug = { ...prev };

      nextDrug[drugId] = {
        ...nextDrug[drugId],
        dose: passedDose
      };

      // console.log("after:", nextDrug[drugId]);
      // this console log is to check before and after the mutation

      return nextDrug;
    });
  };

  // handle change for frequency
  const handleFrequencyChange = (drugId, frequency) => {
    if (!selectedDrugs[drugId]) return toast.error("Please select the drug first than change the frequency if you want ") // if drug is not selected, do nothing
    setSelectedDrugs((prev) => {

      const NextDrug = { ...prev }
      NextDrug[drugId] = { ...NextDrug[drugId], frequency }
      return NextDrug
    })
  }


  // handle confirm button and send data to database and close the overlay
  const handleConfirm = () => {


    // changing the selected drugs object to array and add the patient id and week number to each drug to be able to send it to the database and also add the medicine id to each drug to be able to identify it in the database and also add the indication and note to each drug to be able to show it in the medication details page and also add the route and prescribed by to each drug to be able to show it in the medication details page

    const finalHandDrugs = Object.values(selectedDrugs).map((drug, index) => {

      return {
        patientId: parseInt(id),
        medicineName: drug.name,
        dosage: drug.dose,
        frequency: drug.frequency,
        route: drug.routes,
        prescribedBy: drug.prescribedBy,
        indication: drug.indication,
        note: drug.note,
        medicineId: existingMedications + (index + 1),
        weekNumber: weekId,
      }

    })

    // checking the finall array is completly done or it there is any missing value in the array and if there is any missing value show error message and do not send data to database and if all values are complete send data to database

    console.log(finalHandDrugs);

    // sendnign data to database using react query mutation and then close the overlay and show success message and invalidate the medications query to refetch the updated list of medications for the patient
    insertMedication(finalHandDrugs);

  }

  if (MedicationsLoading) return <LoadingSpinner />

  return (
    // <div onClick={OnClose} className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(30,35,48,0.55)" }}>
    <div className="w-[420px] h-full bg-white flex flex-col border-l border-gray-200 shadow-xl fixed right-0 top-0 z-50">

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-start justify-between flex-shrink-0">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Add Medication
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Select drugs, choose dose and duration</p>
        </div>
        <button
          onClick={OnClose}
          className="w-7 h-7 rounded-md border border-gray-200 bg-white text-gray-400 hover:text-gray-700 hover:border-gray-300 flex items-center justify-center transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search medication name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-[12px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-2.5 border-b border-gray-100 flex gap-1.5 flex-wrap flex-shrink-0">
        {CATEGORIES.map((cat) => (

          <button
            key={cat.key}
            onClick={() => categoryHandler(cat.key)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all  hover:border-gray-300 hover:text-gray-700 ${categoryFilter === cat.key ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-500 border-gray-200'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drug List */}
      <div className="flex-1 overflow-y-auto px-3 py-2.5">
        {filteredDrugs.map((drug) => {
          const isSelected = !!selectedDrugs[drug.id];
          const selectedDose = selectedDrugs[drug.id]?.dose || drug.doses[0];
          const selectedFrequency = selectedDrugs[drug.id]?.frequency || drug.frequencies[0];
          console.log(isSelected);
          return (
            <div
              key={drug.id}
              onClick={() => handleDrugSelect(drug.id, { name: drug.name, cls: drug.cls, cat: drug.cat, dose: drug.doses[0], frequency: drug.frequencies[0], routes: drug.routes, prescribedBy: drug.prescribedBy, indication: drug.indication, note: drug.note })}
              className={`flex items-start gap-3 p-3 rounded-xl mb-1.5 cursor-pointer border border-transparent  ${isSelected ? 'bg-blue-200 border-blue-300' : 'bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all'}`}
            >
              {/* Row Radio */}
              <div className="mt-0.5">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-300 ${isSelected ? 'bg-blue-500' : 'bg-white'}`} >
                  {isSelected && <FaCheck className=" text-xs text-white" />}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold text-gray-900">{drug.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{drug.cls}</div>

                {/* Dose Radio Options */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {drug.doses.map((dose) => (
                    <label
                      key={dose}
                      onClick={(e) => {
                        // stoping the event to reach the parent
                        e.stopPropagation();
                        handleDoseChange(drug.id, dose)
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border cursor-pointer transition-all  hover:border-gray-300 ${isSelected && selectedDose === dose ? 'border-blue-500 bg-blue-300 text-white' : 'bg-white border-gray-200 text-gray-500'}`}
                    >
                      <input
                        type="radio"
                        name={`dose-${drug.id}`}
                        value={dose}
                        // checked={dose === selectedDrugs[drug.id]?.dose}
                        // onChange={() => handleDoseChange(drug.id, dose)}
                        className="sr-only"
                      />
                      <div className="w-3 h-3 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      <span className="text-[10px] font-semibold">{dose}</span>
                    </label>
                  ))}
                </div>
                {/* Frequency */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {drug.frequencies.map((frequency) => (
                    <label
                      key={frequency}
                      onClick={(e) => {
                        // stoping the event to reach the parent
                        e.stopPropagation();
                        handleFrequencyChange(drug.id, frequency)
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border cursor-pointer transition-all  hover:border-gray-300 ${isSelected && selectedFrequency === frequency ? 'border-blue-500 bg-blue-300 text-white' : 'bg-white border-gray-200 text-gray-500'}`}
                    >
                      <input
                        type="radio"
                        name={`frequency-${drug.id}`}
                        value={frequency}
                        // checked={frequency === selectedDrugs[drug.id]?.frequency}
                        // onChange={() => handleFrequencyChange(drug.id, frequency)}
                        className="sr-only"
                      />
                      <div className="w-3 h-3 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      <span className="text-[10px] font-semibold">{frequency}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Duration */}
      {/* <div className="px-4 pt-3 pb-2 border-t border-gray-100 flex-shrink-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Duration</p>
          <div className="flex gap-1.5 flex-wrap">
            {WEEKS.map((w) => (
              <button
                key={w}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
              >
                {w}w
              </button>
            ))}
          </div>
        </div> */}

      {/* Footer */}
      <div className="px-4 py-3.5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-4 h-4 rounded-full bg-gray-900 text-white text-[9px] font-bold flex items-center justify-center">
            {Object.keys(selectedDrugs).length}
          </span>
          <span className="text-[11px] text-gray-400">medications selected</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={OnClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-500 text-[12px] font-semibold hover:border-gray-300 hover:text-gray-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={Object.keys(selectedDrugs).length === 0}
            className={`flex-[2] py-2.5 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 ${Object.keys(selectedDrugs).length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Confirm &amp; Save
          </button>
        </div>
      </div>

    </div>
    // </div>
  );
}


export default AddMedicationOverLay;