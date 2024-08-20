import { Button } from "@mui/material"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import { ENDPOINT } from "../constans"
import { useNavigate } from "react-router-dom"

type Inputs = {
    url: string
}


const Main = () => {

    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );

    const {register, formState: {errors}, handleSubmit} = useForm<Inputs>()
    const navigate = useNavigate()

    const generateURL = async (url: string) => {

        try {
            const response = await axios.post(`${ENDPOINT}/url`, {url})
            const {data} = response;
            return data.shortenUrl
        } catch (error) {
            console.log(error)
        }

    }

    const onFormSubmit: SubmitHandler<Inputs> =async (data) => {
        const {url} = data
        const shortenUrl = await generateURL(url)
        navigate(`/show-link/${shortenUrl._id}`)
    }


    return (
        <div>
          <h1 className="text-5xl text-white">DROP YOUR URL</h1>
    
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex items-center justify-center mt-10 mb-4 space-x-2">
              <input
                {...register("url", { required: "Enter the URL", pattern: {value: pattern,message: "Enter a valid URL"} })}
                type="text"
                className="bg-gray-800 text-white w-full border rounded-md p-2"
              />
              <Button  variant="contained" color="error" type="submit">
                Drop!
              </Button>
            </div>
            {errors.url && (
              <p className="text-red-500 text-sm mt-2">{errors.url.message}</p>
            )}
          </form>
        </div>
      );
}

export default Main