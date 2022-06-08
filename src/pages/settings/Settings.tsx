import { useNavigate } from 'react-router-dom';
import { useDocTitle } from '../../common/hooks/useDocTitle';
import BasicLayout from '../../common/layouts/BasicLayout';
import { useSidebar } from '../../common/stores/SidebarStore';

const Settings = () => {
  const [,] = useDocTitle('uPark | Ρυθμίσεις');
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const navigate = useNavigate();

  return (
    <BasicLayout>
      <div
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
        className='flex w-full flex-col'
      >
        {/* Header */}
        <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
          Ρυθμίσεις
        </div>

        {/* Row */}
        <div className='flex px-8'>
          <div
            onClick={() => {
              navigate('/settings/security');
            }}
            className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            <div className='text-center font-medium'>Ασφάλεια λογαριασμού</div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Settings;
