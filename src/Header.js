import React, { useContext } from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa'
import DataContext from './context/DataContext'

const Header = ({title}) => {

  const {width}=useContext(DataContext)
  return (
    <header className='header'>
        <h1>{title}</h1>
        <div className='header-icon'>
        {width<768 ? <FaMobileAlt/> 
          : width < 992 ? <FaTabletAlt/>
          : <FaLaptop/>

        }
        </div>
    </header>
  )
}

export default Header
