import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <ul className='nav nav-tabs'>
            <li className='nav-item pr-2 pt-3 pb-3'>
                <a href='/' className='btn btn-warning'>Home</a>
            </li>
            <li className='nav-item pr-3 pt-3 pb-3'>
                <a href='/create' className='btn btn-primary'>+ Create Your Blog</a>
            </li>
            <li className='nav-item pr-3 pt-3 pb-3'>
                <a href='/login' className='btn btn-primary'>Login</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar