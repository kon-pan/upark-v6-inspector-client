import { useContext } from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import useAuth from '../contexts/AuthContext';
import { ScreenSizeContext } from '../contexts/ScreenSizeContext';
import { classNames } from '../utils/classnames';

const BasicLayout = ({ children }: any) => {
  const { inspector } = useAuth();
  const screen = useContext(ScreenSizeContext);

  return (
    <div
      className={classNames(
        'relative min-h-screen',
        'flex flex-col',
        'bg-neutral-50'
      )}
    >
      <Navbar />
      <div className='flex w-full flex-1'>
        {!inspector?.id &&
        (screen.isDesktop || screen.isLargeDesktop) ? null : (
          <Sidebar />
        )}
        {children}
      </div>
    </div>
  );
};

export default BasicLayout;
