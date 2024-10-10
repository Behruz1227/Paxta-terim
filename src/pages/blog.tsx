import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import useGet from 'src/hooks/get';

export default function Page() {
  const {data, get, error, isLoading } = useGet()
  useEffect(() => {
    get('/api/machine');
  },[])
  return (
    <div className='container ml-10'>
      <Helmet>
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Machine
      </Typography>
      
    </div>
  );
}
