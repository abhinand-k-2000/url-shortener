// import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='text-white h-14 flex justify-between px-5 items-center '>
        <h1 className='text-3xl'><Link to='/'>drop.me</Link></h1>

        {/* <ModeNightOutlinedIcon className='cursor-pointer'/> */}

    </div>
  )
}

export default Navbar