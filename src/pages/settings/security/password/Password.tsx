import '../../Settings.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../../../common/contexts/AuthContext';
import BasicLayout from '../../../../common/layouts/BasicLayout';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import { classNames } from '../../../../common/utils/classnames';
import axios, { AxiosResponse } from 'axios';

const Password = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const { inspector } = useAuth();
  const { register, handleSubmit } = useForm();

  const [errors, setErrors] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    // await sleep(1000);
    const { currentPassword, newPassword } = data;

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/inspector/${inspector?.id}/account/password/update`,
        { currentPassword, newPassword },
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.data.success) {
        window.location.reload();
      } else {
        setErrors(response.data.err);
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

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
          Κωδικός πρόσβασης
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex w-10/12 flex-col border bg-white shadow-md'
        >
          <div className='mb-2 border-b p-2 text-center font-medium'>
            Αλλαγή κωδικού πρόσβασης
          </div>

          <div className='mb-2 space-y-1 px-4'>
            <div>
              <input
                {...register('currentPassword')}
                type='password'
                placeholder='Τρέχων κωδικός πρόσβασης'
                className={classNames(
                  errors?.currentPassword ? 'form-input-error' : 'form-input'
                )}
              />
              {errors?.currentPassword && (
                <div className='mt-1 text-sm font-medium text-red-700'>
                  {errors.currentPassword}
                </div>
              )}
            </div>
            <div>
              <input
                {...register('newPassword')}
                type='password'
                placeholder='Νέος κωδικός πρόσβασης'
                className={classNames(
                  errors?.newPassword ? 'form-input-error' : 'form-input'
                )}
              />
              {errors?.newPassword && (
                <div className='mt-1 text-sm font-medium text-red-700'>
                  {errors.newPassword}
                </div>
              )}
            </div>
          </div>
          <div className='mb-2 px-4'>
            <button
              type='submit'
              className='w-full rounded border bg-blue-500 py-1.5 font-medium text-white shadow-md'
            >
              {submitting ? (
                <div className='flex justify-center'>
                  <div className='mr-2'>Περιμένετε</div>
                  <div
                    style={{ borderTopColor: 'transparent' }}
                    className='my-0.5 h-5 w-5 animate-spin rounded-full border-2 border-solid border-white'
                  ></div>
                </div>
              ) : (
                'Αποθήκευση'
              )}
            </button>
          </div>
        </form>

        {/* Row */}
        <div className='mt-16 flex w-full flex-col items-center'>
          <Link
            to='/settings/security'
            className='flex items-center justify-center rounded border bg-white px-4 py-1 font-medium shadow-md'
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>Πίσω</div>
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Password;
