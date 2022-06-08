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
      const jsonData = JSON.parse(result);
      // console.log(jsonData.licensePlate);

      // setLicensePlate(result);

      try {
        const response: AxiosResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/inspector/inspect`,
          { licensePlate: jsonData.licensePlate },
          { withCredentials: true }
        );

        const data: { active: boolean } = response.data;

        if (data.active) {
          getResultLoading(false); // Stop loading spinner
          getResult(data.active);
          getLicensePlate(jsonData.licensePlate);
        } else {
          getResultLoading(false); // Stop loading spinner
          getResult(data.active);
          getLicensePlate(jsonData.licensePlate);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='border-b bg-white p-4 shadow-lg'>
      <div className='mx-auto w-11/12'>
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
