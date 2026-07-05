import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import authServices from '../../appwrite/authService'

function LogoutBtn() {

    const dispatch = useDispatch()

    function handleLogout(){
        authServices.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((err) => {
            alert('not able to logout' + err)
        })
    }

  return (
    <button
        onClick={handleLogout}
        className='inline-block px-6 py-2 mt-6.5 duration-200 hover:bg-blue rounded full text-txtColor cursor-pointer active:scale-95 transition-transform  '
    >
        Logout
    </button>
  )
}

export default LogoutBtn
