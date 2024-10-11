import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { NotificationView } from 'src/sections/notification/view';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Notifications() {
  return (
    <>
      <Helmet>
        <title> {`Notification - ${CONFIG.appName}`}</title>
      </Helmet>

      <NotificationView />
    </>
  );
}
