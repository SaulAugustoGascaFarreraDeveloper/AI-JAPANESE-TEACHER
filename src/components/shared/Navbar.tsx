import {UserButton, useUser} from "@clerk/nextjs"


const Navbar = () => {

    


  return (
    <div className='flex bg-yellow-700/40 items-center justify-between p-3 gap-2'>
        <h2 className="font-extrabold ">AI Teacher</h2>
        <h3>WHO WE RAE</h3> 
        <UserButton afterSignOutUrl="/sign-in" showName />
    </div>
  )
}

export default Navbar