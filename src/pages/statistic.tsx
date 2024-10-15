import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/sections/auth';
import Statistic from 'src/sections/statistic/statistic';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {` ${CONFIG.appName}`}</title>
      </Helmet>

      <Statistic />
    </>
  );
}
