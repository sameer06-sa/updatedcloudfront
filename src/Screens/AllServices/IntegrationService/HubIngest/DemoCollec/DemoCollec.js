import React from 'react'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Sidebar1 from '../DemoHub/Sidebar1'
import Sidebar2 from '../DemoHub/Sidebar2'
import Sidebar3 from '../../Sidebar3'

const DemoCollec = () => {
  return (
    <div>
        <Header/>
        <div>
            <Sidebar/>
            <div className="main-layout">
                <Sidebar1/>
                <Sidebar2/>
                <Sidebar3/>
            </div>
        </div>
    </div>
  )
}

export default DemoCollec