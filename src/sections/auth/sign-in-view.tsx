import { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import axios from 'axios';
import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { log_in } from 'src/hooks/api/url';

export function SignInView() {
  const router = useRouter();
  const [data, setData] = useState({
    phoneNmber: '998',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling button during submission

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    });
  };

  const isFormValid = data.phoneNmber.length > 0 && data.password.length >= 2;

  const handleSignIn = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(log_in, {
        phoneNumber: data.phoneNmber,
        password: data.password,
      });
      if (res.data.success) {
        sessionStorage.setItem('token', res.data.message);
        sessionStorage.setItem('ROLE', res.data.body);
        if (res.data.body === 'ROLE_ADMIN') {
          router.push('/dashboard');
        } else if (res.data.body === 'ROLE_MASTER') {
          router.push('/hisobotlar');
        } else if (res.data.body === 'ROLE_HOKIM'){
          router.push('/hisobotlars');
        }
        else {
          router.push('/blog');
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end" component="form" onSubmit={handleSignIn}>
      <TextField
        fullWidth
        name="phoneNmber"
        label="Телефон нўмер"
        type="text"
        value={data.phoneNmber}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Парол"
        value={data.password}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={!isFormValid || isSubmitting} // Button is disabled if form is invalid or submitting
      >
        {isSubmitting ? 'Юклланмоқда...' : 'Кириш'}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Тизимга кириш</Typography>
      </Box>
      {renderForm}
     
    </>
  );
}
