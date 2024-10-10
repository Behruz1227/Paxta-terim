import { useState } from 'react';
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
import usePost from 'src/hooks/post';

export function SignInView() {
  const router = useRouter();
  const [dataLog, setDataLog] = useState({
    phoneNumber: '998',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phoneNumber') {
      const sanitizedValue = value.replace(/\D/g, '');
      setDataLog({
        ...dataLog,
        [name]: sanitizedValue,
      });
    } else {
      setDataLog({
        ...dataLog,
        [name]: value,
      });
    }
  };

  const { data, post, error, isLoading } = usePost();
  console.log(data);

  const handleSignIn = async () => {
    try {
      post(log_in, {
        phoneNumber: dataLog.phoneNumber,
        password: dataLog.password,
      });
      if (data.data.success) {
        sessionStorage.setItem('token', data.data.message);
        if (data.data.body === 'ROLE_ADMIN') {
          router.push('/');
        }
      }
    } catch {
      alert(error);
    }
  };

  // Render the form
  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="phoneNumber"
        label="Phone number"
        type="number"
        value={dataLog.phoneNumber}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxLength: 12 }} // Limit input to 12 characters including country code
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={dataLog.password}
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
        onClick={handleSignIn}
        loading={isLoading} // Show loading state while waiting for the request
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  // Main return function
  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
