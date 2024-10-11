import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/sections/auth';
import ReportHokims from 'src/sections/hokimStatistic/reportHokim';
import ReportHokim from 'src/sections/hokimStatistic/reportHokim';


// ----------------------------------------------------------------------

export default function Page() {
  return ( 
    <>
      <Helmet>
        <title> {`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      <ReportHokims />
    </>
  );
}
