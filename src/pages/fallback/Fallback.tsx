import { useDocTitle } from '../../common/hooks/useDocTitle';

const Fallback = () => {
  const [, ] = useDocTitle("uPark");
  
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-blue-700'>
      <div className='flex space-x-12'>
        <div className='mb-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-56 w-56 text-yellow-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-56 w-56 text-yellow-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
            />
          </svg>
        </div>
      </div>
      <div className='text-center text-2xl font-medium text-white'>
        Συνδεθείτε μέσω συσκευής smartphone ή tablet για να συνεχίσετε.
      </div>
    </div>
  );
};

export default Fallback;
