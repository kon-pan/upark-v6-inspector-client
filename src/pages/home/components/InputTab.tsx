import axios, { AxiosResponse } from 'axios';

import { FormEvent, useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type TabProps = {
  getLicensePlate: (value: string) => void;
  getResultLoading: (value: boolean) => void;
  getResult: (value: boolean) => void;
};

const InputTab = ({
  getResultLoading,
  getLicensePlate,
  getResult,
}: TabProps) => {
  const [licensePlate, setLicensePlate] = useState('');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    getResultLoading(true); // Initialize loading spinner
    console.log({ licensePlate });

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/inspector/inspect`,
        { licensePlate },
        { withCredentials: true }
      );

      console.log(response);
      const data: { active: boolean } = response.data;

      if (data.active) {
        console.log('Ενεργή');
        getResultLoading(false); // Stop loading spinner
        getResult(data.active);
        getLicensePlate(licensePlate);
      } else {
        console.log('Αποτυχία');
        getResultLoading(false); // Stop loading spinner
        getResult(data.active);
        getLicensePlate(licensePlate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className='flex w-full justify-center bg-white p-4 shadow-md'
    >
      <div className='w-full text-gray-700 shadow'>
        <input
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          className={classNames(
            'focus:border-1 h-12 w-full rounded rounded-r-none border pl-3 pr-3 text-xl font-semibold text-gray-800 focus:border-blue-400 focus:bg-white focus:ring-0',
            'border-gray-300 bg-white'
          )}
          type='text'
          placeholder='π.χ. ΑΒΓ1234'
        />
      </div>
      <button
        type='submit'
        className='flex items-center rounded rounded-l-none border border-l-0 border-gray-300 bg-yellow-300 px-3 py-2 shadow active:bg-yellow-400'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </form>
  );
};

export default InputTab;
