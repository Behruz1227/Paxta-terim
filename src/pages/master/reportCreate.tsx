import React from 'react'
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ReportView from 'src/sections/master/view/reportCreate';


const ReportCreate: React.FC = () => {
    return (
        <>
            <Helmet>
                <title> {`Products - ${CONFIG.appName}`}</title>
            </Helmet>

            <ReportView/>
        </>
    );
}

export default ReportCreate;