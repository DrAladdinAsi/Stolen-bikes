import  { useState } from 'react'
import './navbar.css'
import almatin_img from '../../assets/images/bikeindexScreen-removebg-preview.png'

import { Link } from 'react-router-dom';



function Navbar() {


  const [openNavIcon , setOpenNavIcon ] = useState(false)


  return (
    <div className='navbar'>
        <div className="navbar_left">

                    {/* <span>مجموعة المتين</span> */}
                    <img src={almatin_img} alt="almatin_image" className='navbar_image' />



        </div>


        <div className="navbar_right">
        <div className='big_navbar'>


 <Link to="/emp/vacationreq" className='nav_links_white active_navbarItem' >Search bikes</Link>

 <Link to="/emp/vacationreq" className='nav_links_white' >Donate</Link>

 <Link to="/emp/vacationreq" className='nav_links_white' >Blog</Link>

  <Link to="/emp/eval_emp" className='nav_links_white' >Stolen bike?</Link>
  
  <Link to="/emp/salarypage" className='nav_links_white' >Help</Link>

  <Link to="/emp/salarypage" className='nav_links_white' >log in</Link> 
  
   <Link to="/emp/salarypage" className='nav_links_white nav_links_signUp' >Sign up</Link>

 </div>

 <div className='small_navbar'>

   <div className='small_navbar_icon_menu' onClick={()=>{ setOpenNavIcon(!openNavIcon); console.log("nav icon ",openNavIcon) }}>

    <div className='menuIcon_item'></div>
    <div className='menuIcon_item'></div>
    <div className='menuIcon_item'></div>

   </div>


   <div className={openNavIcon ? "menu active" : "menu"}>

   <Link to="/emp/vacationreq" className='nav_links_white active_navbarItem' >Search bikes</Link>

   <Link to="/emp/vacationreq" className='nav_links_white' >Donate</Link>

   <Link to="/emp/vacationreq" className='nav_links_white' >Blog</Link>

   <Link to="/emp/eval_emp" className='nav_links_white' >Stolen bike?</Link>
 
   <Link to="/emp/salarypage" className='nav_links_white' >Help</Link>

   <Link to="/emp/salarypage" className='nav_links_white' >log in</Link> 
 
   <Link to="/emp/salarypage" className='nav_links_white nav_links_signUp' >Sign up</Link>


      </div>

 </div>

        </div>
    </div>
  )
}

export default Navbar