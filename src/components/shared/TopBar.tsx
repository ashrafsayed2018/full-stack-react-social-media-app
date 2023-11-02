import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { UseUserContext } from '@/context/AuthContext'

const TopBar = () => {
    const {mutate:signOut,isSuccess} = useSignOutAccount() ;
    const navigate = useNavigate();
    const {user} = UseUserContext()
    useEffect(()=> {
        if(isSuccess){
            navigate('/sign-up')
        }
    }, [isSuccess,navigate]);
  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to="/" className='flex gap-3 items-center'>
                <img src="/assets/images/logo.svg" width={130} height={320} alt="logo" />
            </Link>
            <div className="flex gap-4">
                <Button variant="ghost" className='shad-btn_ghost'
                onClick={()=> signOut()}>
                    <img src="/assets/icons/logout.svg" alt="logout" />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile image" className='h-8 w-8 rounded-full'/>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar