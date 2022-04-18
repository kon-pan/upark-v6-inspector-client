import './Sidebar.css';
import { Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import { useSidebar } from '../../stores/SidebarStore';
import { classNames } from '../../utils/classnames';
import HomeIcon from './icons/HomeIcon';
import LogoutIcon from './icons/LogoutIcon';
import CogIcon from './icons/CogIcon';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { logout } = useAuth();

  return (
    <div
      id='sidebar'
      className={classNames(
        'w-64 space-y-6 bg-white py-7 px-2',
        'absolute inset-y-0 left-0 z-50 transform',
        'shadow-[0_0px_40px_-10px_rgba(0,0,0,0.3)]',
        sidebarOpen
          ? 'lg:border-r'
          : '-translate-x-full shadow-none lg:border-r',
        'xl:relative xl:top-0 xl:-mt-0 xl:translate-x-0',
        'lg:top-16 lg:z-10 lg:-mt-2',
        'transition duration-200 ease-in-out'
      )}
    >
      <nav className=''>
        <div className='flex flex-col justify-between space-y-1'>
          <Link
            onClick={() => {
              setSidebarOpen(false);
            }}
            to='/'
            className='sidebar-navlink'
          >
            <HomeIcon />
            <div>Αρχική σελίδα</div>
          </Link>

          <Link
            onClick={() => {
              setSidebarOpen(false);
            }}
            to='/settings'
            className='sidebar-navlink'
          >
            <CogIcon />
            <div>Ρυθμίσεις</div>
          </Link>

          <div onClick={logout} id='logout-navlink'>
            <LogoutIcon />
            <div>Αποσύνδεση</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
