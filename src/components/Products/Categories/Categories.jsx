import React from 'react'

import Category from './Category'
import { LuBaby } from "react-icons/lu";
import { MdElderly } from "react-icons/md";

import { FaShoppingCart } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { FaCapsules } from "react-icons/fa";
import { FaHeartbeat } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";



const categories = [
  {
    id: 1,
    name: 'baby',
    icon: <LuBaby />
  },
  {
    id: 2,
    name: 'elderly',
    icon: <MdElderly />
  },
  {
   id:3,
    name: 'shopping',
    icon: <FaShoppingCart />
  },
  {
    id:4,
    name: 'herbs',
    icon: <FaLeaf />
  },
  {
    id:5,
    name: 'medicine',
    icon: <FaCapsules />
  },
  {    id:6,
    name: 'health',
    icon: <FaHeartbeat />
  }
]

const Categories = () => {
  return (

    <>
      <div className='w-full flex flex-col items-center justify-center p-7 gap-11'>
        <div className='w-full flex flex-row  justify-start items-center gap-14  bg-sky-100 rounded-md p-7'>{
          categories.map(category => {
            return (
              
                <Category key={category.id} name={category.name} icon={category.icon} />
              
            )
          })
        }</div>
      </div>
    </>
  )
}

export default Categories