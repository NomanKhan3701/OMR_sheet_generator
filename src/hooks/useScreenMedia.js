import React, { useEffect, useState } from 'react';

export const useScreenMedia = () => {
    const [media, setMedia] = useState({
        tabLg: false,
        tab: false,
        tabSm: false,
        mobileLg: false,
        mobile: false,
        mobileSm: false,
        desktop: false,
        desktopSm: false,
    });
    const [width, setWidth] = useState(0);
    const screens = {
        desktop: 1400,
        desktopSm: 1200,
        tabLg: 992,
        tab: 850,
        tabSm: 768,
        mobileLg: 650,
        mobile: 576,
        mobileSm: 430,
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        setWidth(window.innerWidth);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        let tabLg = false, tab = false, tabSm = false, mobileLg = false, mobile = false, mobileSm = false, desktop = false, desktopSm = false;

        if (width >= screens.desktop) {
            desktop = true;
        } else if (width >= screens.desktopSm) {
            desktopSm = true;
        } else if (width >= screens.tabLg) {
            tabLg = true;
        } else if (width >= screens.tab) {
            tab = true;
        } else if (width >= screens.tabSm) {
            tabSm = true;
        } else if (width >= screens.mobileLg) {
            mobileLg = true;
        } else if (width >= screens.mobile) {
            mobile = true;
        } else if (width >= screens.mobileSm) {
            mobileSm = true;
        }

        setMedia({ tabLg, tab, tabSm, mobileLg, mobile, mobileSm, desktop, desktopSm, width, height });
        setWidth(width);
    }

    return { media, width, screens };
};