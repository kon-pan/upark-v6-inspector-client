import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import useAuth from './common/contexts/AuthContext';
import { ScreenSizeContext } from './common/contexts/ScreenSizeContext';
import Fallback from './pages/fallback/Fallback';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Password from './pages/settings/security/password/Password';
import Security from './pages/settings/security/Security';
import Settings from './pages/settings/Settings';

function App() {
  const { inspector } = useAuth();
  const screen = useContext(ScreenSizeContext);
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

  return screen.isMobile || screen.isTablet ? (
    <BrowserRouter>
      <Routes>
        <Route
          path='/settings/security/password'
          element={inspector?.id ? <Password /> : <Navigate to='/' />}
        />
        <Route
          path='/settings/security'
          element={inspector?.id ? <Security /> : <Navigate to='/' />}
        />
        <Route
          path='/settings'
          element={inspector?.id ? <Settings /> : <Navigate to='/' />}
        />
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
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
