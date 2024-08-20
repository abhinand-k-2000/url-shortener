import Navbar from '../components/Navbar'
import Main from '../components/Main'

const HomePage = () => {
  return (
    <div className="bg-gray-900  flex flex-col min-h-screen">
      <Navbar/>

      <div className="flex flex-1 items-center justify-center"> 
      <Main />
      </div>
      </div>
  )
}

export default HomePage