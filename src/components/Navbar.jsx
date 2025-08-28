import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-violet-700 text-black text-2xl text font-medium '>
      <div className='flex justify-around items-center px-4 py-5 h-12'>
        <div>
        <span>&lt;Pass</span><span className='text-amber-600'>/Store&gt;</span>
        </div>
        <button  onClick={()=>window.open("https://github.com/Rudravo")} className='text-white bg-violet-700 my-5 mx-2 rounded-full hover:bg-violet-800 flex  justify-between items-center ring-white ring-1'>
          <img className='w-10 p-1' src="/src/icons/github.png"/>
          <span className='font-bold px-2'>GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
