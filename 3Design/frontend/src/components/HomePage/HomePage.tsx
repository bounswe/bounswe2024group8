import React from 'react'
import styles from "./HomePage.module.css"
import PageHeader from '../PageHeader/PageHeader'
import SideBar from '../SideBar/SideBar'
const HomePage = () => {
    return (
        <>
            <PageHeader/>
            <div className='flex'>
                <SideBar/>

            </div>
        </>
    )
}

export default HomePage