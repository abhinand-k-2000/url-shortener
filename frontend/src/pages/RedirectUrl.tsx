import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ENDPOINT } from '../constans'

const RedirectUrl = () => {

    const {shortId} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    

    useEffect(() => {
        if(!shortId || typeof shortId !== 'string'){
            setError("Short ID not found");
            setIsLoading(false);
            return 
        }

        const fetchUrl = async() => {
            try {
                const response = await axios.get(`${ENDPOINT}/url/${shortId}`)
                window.location.href = response.data.url.redirectUrl 
            } catch (error) {
                console.log(error)
                setError("An error occured while redirecting.");
                setIsLoading(false)
            }
        }


        fetchUrl()
    }, [shortId])
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold text-white mb-2">Redirecting you</h1>
            <p className="text-gray-300">Please wait while we take you to your destination...</p>
          </>
        ) : error ? (
          <div className="bg-red-600 text-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RedirectUrl