import React from 'react'

const TaskCard = () => {
  return (
    <div className='w-full h-auto lg:h-[15vh] bg-[var(--background)] rounded-md flex flex-col lg:flex-row shadow-md gap-y-2'>
        
        <div className="w-full h-[10vh] lg:w-1/5 lg:h-full flex flex-col lg:flex-row lg:m-[0!important] mt-[8px!important] ">
            <div className="w-full lg:w-1/2 grid place-items-center">
                <img src="/date.svg" className='w-[32px]' alt="" />
            </div>

            <div className='w-full lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-start text-xs'>
                <b>Due Date : 11/12/2001</b>
                <b>Days Remaining : 2</b>
            </div>
        </div>

        <div className="w-full h-[20vh] lg:w-3/5 lg:h-full flex flex-col">
            <div className="w-full h-[5vh] lg:h-1/5 grid place-items-center">
                <div className='h-7/10 w-6/12 lg:w-2/12 flex items-center gap-1 p-[0px 8px!important] rounded-2xl bg-[var(--orange)] justify-evenly'>
                    <img src="/pending.svg" className='w-[16px]' alt="" />
                    <b className='text-xs text-[var(--background)]'>Pending</b>
                </div>
            </div>

            <div className="w-full h-auto lg:h-4/5">
                <p className='text-md p-[4px!important] text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur cupiditate accusantium quaerat perspiciatis repudiandae deleniti officia quod eveniet harum voluptatem dolorum, quas corporis vel sunt aut! Ea, magni aliquid.</p>
            </div>
        </div>

        <div className="w-full h-[10vh] lg:w-1/5 lg:h-full grid place-items-center">
            <button className='transition-all duration-300 outline-[var(--orange)] outline-2 bg-[var(--orange)] text-[var(--background)] font-bold p-[8px!important] rounded-md hover:bg-[var(--background)] hover:text-[var(--orange)] cursor-pointer'>
                Mark Compleated
            </button>
        </div>

    </div>
  )
}

export default TaskCard