import { useSidebar } from '../../stores/SidebarStore';
import { classNames } from '../../utils/classnames';
import BurgerIcon from './common/BurgerIcon';
import CloseIcon from './common/CloseIcon';
import './Navbar.css';

const Navbar = () => {
  const { toggleSidebarOpen, sidebarOpen } = useSidebar();

  return (
    <div
      className={classNames(
        'z-50 justify-between bg-blue-700 text-gray-50',
        'flex items-center',
        'sticky top-0'
      )}
    >
      <div className='flex items-center'>
        {/* Logo */}
        <div
          id='navbar-logo'
          className='cursor-pointer'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          u<span className='font-bold text-yellow-300'>Park</span>{' '}
          <span className='text-lg font-normal italic'>Ελεγκτής</span>
        </div>
      </div>

      {/* Navbar mobile toggle button for sidebar */}
      <button
        onClick={toggleSidebarOpen}
        className='p-2 focus:bg-blue-800 focus:outline-none lg:hidden'
      >
        {sidebarOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>
    </div>
  );
};

export default Navbar;
