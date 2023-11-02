import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import {NavLink,useLocation} from 'react-router-dom'

const BottomBar = () => {
  const {pathname} = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link:INavLink) => {
              const isActive = pathname === link.route;
            
              return(
                  <NavLink to={link.route} className={`flex-center flex-col gap-2 py-2 px-10 transiton-all duration-300 ${isActive && "bg-primary-500 rounded-[10px]"}`} key={link.label} >
                    <img 
                    src={link.imgURL} 
                    alt={link.label}
                    width={20}
                    height={20}
                    className={` ${isActive && "invert-white"}`} />
                   <div className="tiny-medium text-light-2"> {link.label}</div>
                  </NavLink>
                
              )
            })}    
    </section>
  )
}

export default BottomBar