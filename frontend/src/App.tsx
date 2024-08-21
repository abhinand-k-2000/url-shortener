import './App.css'
import HomePage from "./pages/HomePage"
import  {createBrowserRouter, RouterProvider} from "react-router-dom"
import ShowLink from './pages/ShowLink'
import RedirectUrl from './pages/RedirectUrl'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/show-link/:id',
    element: <ShowLink />
  },
  {
    path: '/:shortId', 
    element: <RedirectUrl />
  }
])


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>   
  )
}

export default App



 