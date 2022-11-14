import React from 'react'
import load from './load.gif'
const Spinner =() => {
  
    return (
      <div className='text-center'>
        <img src={load} alt="loading" />
      </div>
    )
  }

export default Spinner