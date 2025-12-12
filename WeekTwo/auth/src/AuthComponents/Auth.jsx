import React, { useState } from 'react'
import AuthForm from './AuthForm'

const Auth = () => {

  const [activeForm,setActiveForm] = useState(true);

  return (
    <>
<div className="w-full h-[100vh] bg-[url(/shapes.jpg)] grid place-items-center">

  <div className="w-10/12 h-[80vh] bg-gray-50 rounded-md absolute flex flex-col lg:flex-row">
    
    {/* Element 1 */}
    <div className={"w-full lg:w-1/2 h-[82vh] py-4 bg-blend-multiply transition-all duration-500 bg-gradient-to-br from-[var(--orange)] to-[var(--grey)] relative top-[-1vh] left-0 top-[-1vh] z-10 rounded-md flex flex-col items-center justify-center " + (activeForm ? "left-0": "lg:left-[50%]")}>
        
      <img className='w-1/2' src="/logoWhite.png" alt="" />
      <h1 className='text-2xl text-white font-bold text-center'>KNIGHT DEFENCES</h1>
      <small className='text-md text-center text-white'>We Defend Your Assets</small>
    </div>

    {/* Element 2 */}
    <div className={"w-full lg:w-1/2 h-[80vh] z-0 transition-all duration-500 relative grid place-items-center relative " + (activeForm ? "right-0": "lg:right-[50%]")}>
      <AuthForm activeForm={activeForm} setActiveForm={setActiveForm}/>
    </div>

  </div>

</div>

    </>
  )
}

export default Auth