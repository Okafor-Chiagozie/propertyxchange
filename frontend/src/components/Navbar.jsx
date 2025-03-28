import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import AddPropertyModal from './AddPropertyModal'
import useAuthCheck from '../hooks/useAuthCheck'

const Navbar = ({ containerStyles }) => {
    const [modalOpened, setModalOpened] = useState(false)
    const { validateLogin } = useAuthCheck()
    
    const handleAddPropertyClick = () => {
        if (validateLogin()) {
            setModalOpened(true)
        }
    }

    return (
        <nav className={`${containerStyles}`}>
            <NavLink to={'/'} className={({ isActive }) => isActive ? "active-link font-semibold" : "font-semibold"}>
                Home
            </NavLink>
            <NavLink to={'/listing'} className={({ isActive }) => isActive ? "active-link font-semibold" : "font-semibold"}>
                Listing
            </NavLink>
            <NavLink to={'mailto:info@zenhomes.com'} className={({ isActive }) => isActive ? "active-link font-semibold" : "font-semibold"}>
                Contact
            </NavLink>
            <div onClick={handleAddPropertyClick} className={"cursor-pointer font-semibold"}>
                Add Property
            </div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
        </nav>
    )
}

export default Navbar