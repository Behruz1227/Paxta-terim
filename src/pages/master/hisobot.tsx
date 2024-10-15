import React from 'react'
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import FarmsView from 'src/sections/farms/view/farms-view';
import HisobotView from 'src/sections/master/view/farms-view';

const Hisobotlar: React.FC = () => {
    return (
        <>
            <Helmet>
                <title> {`${CONFIG.appName}`}</title>
            </Helmet>

            <HisobotView/>
        </>
    );
}

export default Hisobotlar;