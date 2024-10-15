import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';
import ReportsView from 'src/sections/reports/view/reports-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`${CONFIG.appName}`}</title>
      </Helmet>

      <ReportsView />
    </>
  );
}
