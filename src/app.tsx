import 'src/global.css';
import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  useScrollToTop();
  const { pathname } = useLocation();
  const role = sessionStorage.getItem('ROLE');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname === '/') {
      if (token && role) {
        if (role === 'ROLE_ADMIN') {
          navigate('/dashboard')
        } else if (role === 'ROLE_USER') {
          navigate('/machines')
        }
        else if (role === 'ROLE_HOKIM') {
          navigate('/machines')
        }
      } else {
        navigate('sign-in');
      }
    }
  }, [])
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
