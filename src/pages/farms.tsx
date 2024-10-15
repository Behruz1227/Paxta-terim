import React from 'react'
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import FarmsView from 'src/sections/farms/view/farms-view';

const Farms: React.FC = () => {
    return (
        <>
            <Helmet>
                <title> {` ${CONFIG.appName}`}</title>
            </Helmet>

            <FarmsView />
        </>
    );
}

export default Farms;