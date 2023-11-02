import { useEffect } from 'react'
import { Link, NavLink, useNavigate ,useLocation} from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { UseUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftBar = () => {
  const {pathname} = useLocation();
    const {mutate:signOut,isSuccess} = useSignOutAccount() ;
    const navigate = useNavigate();
    const {user} = UseUserContext()
    useEffect(()=> {
        if(isSuccess){
            navigate('/sign-up')
        }
    }, [isSuccess,navigate]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
          <Link to="/" className='flex gap-3 items-center'>
              <img src="/assets/images/logo.svg" width={170} height={36} alt="logo" />
          </Link>
          <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
              <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile image" className='h-14 w-14 rounded-full'/>
              <div className="flex flex-col">
                <p className="body-bold">{user.name}</p>
                <p className="small-regular text-3">{user.username}</p>
              </div>
          </Link>
          {/* list  */}
          <ul className="flex flex-col gap-6">
            {sidebarLinks.map((link:INavLink) => {
              const isActive = pathname === link.route;
            
              return(
                <li className={`group leftsidebar-link ${isActive && "bg-primary-500"}`} key={link.label}>
                  <NavLink to={link.route} className="flex gap-4 p-4 items-center" >
                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && "invert-white"}`} />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
      </div>
      {/* logout */}
      <Button variant="ghost" className='shad-btn_ghost hover:bg-primary-500 group'
      onClick={()=> signOut()}>
         <p className="small-medium lg:base-medium ml-4">Logout</p>
        <img src="/assets/icons/logout.svg" alt="logout" className='group-hover:invert-white' />
       
      </Button>
    </nav>
  )
}

export default LeftBar