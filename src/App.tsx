import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import useAuth from './common/contexts/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  const { inspector } = useAuth();
  console.log(inspector);

  //gets screen size - to fix mobile viewport height problem
  useEffect(() => {
    function handleResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={inspector?.id ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/'
          element={inspector?.id ? <Home /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
