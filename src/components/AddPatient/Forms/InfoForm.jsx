import React, { useEffect, useReducer, useState } from 'react'
import Input from '../../../UI/Input'
import Label from '../../../UI/Label'
import { get, useForm } from 'react-hook-form'
import { data, useNavigate, useOutletContext, useSearchParams } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GetEmailIsExist, insertPatientInfo } from '../../../API/PatientInfo'
import toast from 'react-hot-toast'



const InfoForm = () => {



  const { register, handleSubmit, formState: { errors } } = useForm()


  // 1) this is not nessecarry now because we are navigating to another page and this kind of parameter
  //    is usefull when you are navigating in one page like when are you making a filter, sorting or pageination
  // const [searchPrams, setSearchPrams] = useSearchParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // 2)this field email is the only one has state because we want to make a validation for it and we dont want to send request
  //   to backend when the format of email is wrong so we are using useEffect and useState for this field and we also making 
  //   a debounce for it to make the request after 500ms when the user stoped typing and we also making a full controll to 
  //   this field when we checking this email is exist or not in the database we can show a message to user that this email is
  //   already exist and we can also disable the button of submit when the email is exist in the database 

  // states for email 
  const [email, setEmail] = useState('');
  const [emailExist, setEmailExist] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // handling email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }


  useEffect(() => {

    // const checkEmailExists = async () => {

    // regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // haddii email format-ka xun yahay
    if (!emailRegex.test(email)) {
      return;
    }


    // let reponse;

    const timer = setTimeout(async () => {
      setIsCheckingEmail(true);

      // request backend
      // checkEmailExists(email);

      // console.log('email after 500ms');
      try {
        const res = await GetEmailIsExist(email);
        console.log(res);

        if (res.length > 0) {
          setEmailExist(true);
        } else {
          setEmailExist(false);
        }
      } catch (error) {
        console.error(error);
      }
      setIsCheckingEmail(false);
    }, 1000);

    // cleanup
    return () => {
      clearTimeout(timer);
    };
    // }

    // checkEmailExists();

  }, [email]);

  const { mutate } = useMutation({
    mutationFn: insertPatientInfo,
    onSuccess: () => {
      toast.success('Patient info added successfully');
      queryClient.invalidateQueries({ queryKey: ['infoPatient'] })
      // navigate to next form
      navigate("/AddPatient/PatientTest");
    },
    onError: (error) => {
      toast.error('Failed to add patient info');
      console.error(error);
    }
  })

  const onsubmit = (data) => {
    // e.preventDefault()

    // checking data and sending to backend
    console.log(data);
    const obj = {
      firstName: data.firstName,
      listName: data.listName,
      sex: data.sex,
      age: data.age,
      mobileNumber: data.mobileNumber,
      Address: data.Address,
      email: email
    }
    mutate(obj);



  }

  return (
    <>
      <form className='w-full h-[100%] overflow-visible flex flex-col justify-start items-start gap-3' action="" onSubmit={handleSubmit(onsubmit)}>

        <h1 className='text-gray-600  text-2xl text-center mb-2 '>Patient Info</h1>
        <div className='flex w-full h-[8rem] justify-start items-start px-6 gap-6 '>

          {/* FirstName */}
          <div className='flex flex-col basis-[50%] justify-start items-start p-2 gap-2 '>
            <Label text={'First Name'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter first name'} register={register("firstName", {
              required: 'this field is required to fill',
              pattern: {
                value: /^[a-zA-Z ]{4,20}$/,

                message:
                  "4-20 xaraf, letters only"
              }
            })} />
            {errors.firstName &&
              <span className='text-xs text-red-500'>{errors.firstName?.message}</span>
            }
          </div>


          {/* LastName */}

          <div className='flex basis-[50%] flex-col justify-start items-start p-2 gap-2'>
            <Label text={'Last Name'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter last name'} register={register('listName', {
              required: 'this field is required to fill',
              pattern: {
                value: /^[a-zA-Z ]{4,20}$/,
                message:
                  "4-20 xaraf, letters only"
              }
            })} />
            {errors.listName &&
              <span className='text-xs text-red-500'>{errors.listName?.message}</span>
            }
          </div>
        </div>




        <div className='flex justify-start items-center w-full py-4 px-8 gap-10 '>
          {/* Gender */}
          <div className='flex flex-col justify-start items-start gap-2'>
            <span>Gender</span>
            <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

              <div className='flex  basis-[50%] justify-start items-center h-full '>
                <input type="radio" id="male" name="gender" value="male" {...register('sex')} className='hidden peer' />
                <label htmlFor="male" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-white peer-checked:rounded peer-checked:text-green-500'>Male</label>
              </div>

              <div className='flex  basis-[50%] justify-start items-center h-full'>
                <input type="radio" id="female" name="gender" value="female" {...register('sex')} className='hidden peer' />
                <label htmlFor="female" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-green-500 peer-checked:rounded peer-checked:text-white'>Female</label>
              </div>
            </div>
          </div>


          {/* Age */}

          <div className='flex flex-col w-[25rem] justify-start items-start  gap-2'>
            <Label text={'Age'} />
            <Input type={'number'} Width={'25rem'} placeHolder={'Enter age'} register={register('age', {
              required: 'this field is required to fill',
              pattern: {
                value: /^(?:[6-9]|[1-9][0-9]|1[01][0-9]|120)$/,
                message: 'Please enter a valid age'
              }
            })} />
            {errors.age &&
              <span className='text-xs text-red-500'>{errors.age?.message}</span>
            }
          </div>

        </div>


        <div className='flex justify-start items-start gap-10 px-8 h-auto mb-3'>
          {/* Email */}

          <div className='flex flex-col basis-[50%]  justify-start items-start  gap-2'>
            <Label text={'Email'} />
            <input type='email' placeHolder={'Enter email'} className={'h-21 bg-transparent text-gray-800  border-gray-700 rounded-lg border outline-none text-base p-3 font-mono w-[25rem]'} onChange={handleEmailChange} value={email} />
            {isCheckingEmail ? (
              <span className='text-xs text-blue-500'>Checking email...</span>
            ) : emailExist ? (
              <span className='text-xs text-red-500'>this email is already exist</span>
            ) : null}
          </div>

          {/* Phone number */}


          <div className='flex flex-col basis-[50%]  justify-start items-start  gap-2'>
            <Label text={'Phone'} />
            <Input type={'tel'} Width={'25rem'} placeHolder={'Enter phone number'} register={register('mobileNumber', {
              required: 'this field is required to fill',
              pattern: {
                value:
                  /^(\+252|0)(61|62|63|68)\d{7}$/,

                message:
                  "Number Somalia sax ah geli"
              }
            })} />
            {errors.mobileNumber &&
              <span className='text-xs text-red-500'>{errors.mobileNumber?.message}</span>
            }
          </div>
        </div>

        {/* Address */}


        <div className='flex flex-col w-full  justify-start items-start px-7 gap-2 '>
          <Label text={'Address'} />
          <textarea {...register('Address', {
            required: 'this field is required to fill'
          })} className=' w-[53.6rem] h-[7rem] bg-transparent text-gray-800 border-gray-700 rounded-lg border outline-none text-base p-3 font-mono resize-none' placeholder='please enter address here' />
          {errors.Address &&
            <span className='text-xs text-red-500'>{errors.Address?.message}</span>
          }
          {/* please enter address here
          </textarea> */}
        </div>

        <button type='submit' className='sticky bottom-2 left-[100%] w-36 h-11 rounded-md text-white text-base bg-blue-400 border-2 border-blue-300 p-3 flex justify-center items-center'> Next </button>

      </form >
    </>
  )
}

export default InfoForm