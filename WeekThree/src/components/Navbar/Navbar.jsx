import React from 'react'

const Navbar = () => {
  return (
    <div className="w-9/10 h-full flex flex-row justify-between">

        {/* Site Name */}
        <div className="w-2/4 lg:w-2/5 h-full grid place-items-center">
            <h2 className='font-bold text-md text-[var(--orange)]'>KNIGHT DEFENCES</h2>
        </div>

        {/* Site Logo */}
        <div className="w-1/4 lg:w-1/5 h-full grid place-items-center bg-[var(--orange)] rounded-b-md">
            <img src="/logo.png" alt="knight defences" className='w-[50px]'/>
        </div>

    </div>
  )
}

export default Navbar