import { useState } from 'react';
import BasicLayout from '../../common/layouts/BasicLayout';
import { useSidebar } from '../../common/stores/SidebarStore';
import { classNames } from '../../common/utils/classnames';
import QRTab from './components/QrTab';

const Home = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [tab, setTab] = useState(1);
  const [licensePlate, setLicensePlate] = useState('');
  const [resultLoading, setResultLoading] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [resultFailure, setResultFailure] = useState(false);

  // Function to lift state up from child component
  const getLicensePlate = (value: string) => {
    setLicensePlate(value);
  };

  // Function to lift state up from child component
  const getResultLoading = (value: boolean) => {
    setResultLoading(value);
  };

  const getResult = (value: boolean) => {
    if (value) {
      setResultSuccess(true);
      setResultFailure(false);
    } else {
      setResultFailure(true);
      setResultSuccess(false);
    }
  };

  return (
    <BasicLayout>
      <div
        className='z-0 flex w-full flex-1 flex-col items-center'
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
      >
        {/* Row */}
        <div className='flex w-full flex-col'>
          {/* Tabs */}
          <div className='flex w-full bg-white'>
            <div
              onClick={() => setTab(1)}
              className={classNames(
                'w-1/2 p-2 text-center font-medium',
                tab === 1 ? 'border-b-4 border-yellow-300' : 'border-b-4',
                'cursor-pointer'
              )}
            >
              Κωδικός QR
            </div>
            <div
              onClick={() => setTab(2)}
              className={classNames(
                'w-1/2 p-2 text-center font-medium',
                tab === 2 ? 'border-b-4 border-yellow-300' : 'border-b-4',
                'cursor-pointer'
              )}
            >
              Αρ. κυκλοφορίας
            </div>
          </div>

          {/* Tab content */}
          {tab === 1 && (
            <QRTab
              getResultLoading={getResultLoading}
              getLicensePlate={getLicensePlate}
              getResult={getResult}
            />
          )}
        </div>

        {/* Row */}
        <div className='mt-4 flex w-full flex-col items-center'>
          {resultLoading && (
            <div className='mt-4 flex h-full flex-1 flex-col items-center justify-center'>
              <div
                style={{ borderTopColor: 'transparent' }}
                className='h-8 w-8 animate-spin rounded-full border-2 border-solid border-gray-800'
              ></div>
              <div className='mt-2 text-sm'>Φόρτωση δεδομένων...</div>
            </div>
          )}
        </div>

        {!resultLoading && resultSuccess && (
          <div className='flex w-11/12 flex-col rounded border bg-white p-4 shadow-md'>
            <div className='flex flex-col pb-1'>
              <div className='font-medium text-gray-700'>
                Αριθμός κυκλοφορίας
              </div>
              <div className='text-2xl font-semibold'>{licensePlate}</div>
            </div>
            <div className='flex flex-col pt-1'>
              <div className='font-medium text-gray-700'>Κατάσταση κάρτας</div>
              <div className='text-3xl font-semibold text-green-700'>
                Ενεργή
              </div>
            </div>
          </div>
        )}
        {!resultLoading && resultFailure && (
          <div className='flex w-11/12 flex-col rounded border bg-white p-4 shadow-md'>
            <div className='flex flex-col border-b pb-1'>
              <div className='font-medium text-gray-700'>
                Αριθμός κυκλοφορίας
              </div>
              <div className='text-2xl font-semibold'>{licensePlate}</div>
            </div>
            <div className='flex flex-col pt-1'>
              <div className='font-medium text-gray-700'>Κατάσταση κάρτας</div>
              <div className='text-3xl font-semibold text-red-700'>
                Αποτυχία
              </div>
            </div>
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default Home;
