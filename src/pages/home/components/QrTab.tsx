import axios, { AxiosResponse } from 'axios';
import QrReader from 'react-qr-reader';

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

type TabProps = {
  getLicensePlate: (value: string) => void;
  getResultLoading: (value: boolean) => void;
  getResult: (value: boolean) => void;
};

const QRTab = ({ getResultLoading, getLicensePlate, getResult }: TabProps) => {
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };

  const handleScanWebCam = async (result: string | null) => {
    if (result) {
      getResultLoading(true); // Initialize loading spinner
      console.log(result);

      // setLicensePlate(result);

      try {
        const response: AxiosResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/inspector/inspect`,
          { licensePlate: result },
          { withCredentials: true }
        );

        console.log(response);
        const data: { active: boolean } = response.data;

        if (data.active) {
          console.log('Ενεργή');
          getResultLoading(false); // Stop loading spinner
          getResult(data.active);
          getLicensePlate(result);
        } else {
          console.log('Αποτυχία');
          getResultLoading(false); // Stop loading spinner
          getResult(data.active);
          getLicensePlate(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='p-4 bg-white border-b shadow-lg'>
      <div className='w-11/12 mx-auto'>
        <QrReader
          delay={500}
          style={{ width: '100%' }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
          facingMode='environment'
        />
      </div>
    </div>
  );
};

export default QRTab;