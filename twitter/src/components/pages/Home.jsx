import Sidebar from '../Home/Sidebar'
import Widget from '../Home/Widget'
import Chatbot from '../Chatbot'
import NotificationComponent from './Notification/NotificationComponent'
import { Outlet, useNavigate } from 'react-router-dom'
import '/src/App.css'
import { useUserAuth } from '../../context/userauth'

function Home() {
  const {logout,user} = useUserAuth()
  const navigate = useNavigate()
  // const user = {
  //   displayName: 'Coderado',
  //   email: 'Coderado@gmail.com',
  // }

  const handlelout = async () => {
    try {
      await logout()
      navigate('/signup')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (

    <div className="flex flex-col sm:flex-row p-0 md:px-28  overflow-y-scroll h-screen">
      {/* <NotificationComponent/> */}
      <div className='pb-2'>
        <Sidebar handlelogout={handlelout} user={user} />
      </div>
      <div className="outlet flex-1 lg:w-3/5 overflow-y-scroll border-r-[1px]">
        <Outlet />
      </div>
      <div className="hidden md:hidden lg:block w-1/3">
        {/* <Widget /> */}
      </div>
    </div>
  )
}

export default Home
