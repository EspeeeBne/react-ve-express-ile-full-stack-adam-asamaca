import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axios';
import { STATUS_ENDPOINT } from '../api-routes';
import { useTranslation } from 'react-i18next';

const SiteStatusContext = createContext();

export const SiteStatusProvider = ({ children }) => {
  const { t } = useTranslation();
  const [siteStatus, setSiteStatus] = useState({
    status: false,
    loading: true,
  });

  useEffect(() => {
    const fetchSiteStatus = async () => {
      try {
        const { data } = await axios.get(STATUS_ENDPOINT);
        console.log('Fetched Site Status:', data);
        if (data?.status && data.status.toUpperCase() === 'OK') {
          setSiteStatus({ status: true, loading: false });
        } else {
          setSiteStatus({ status: false, loading: false });
        }
      } catch (error) {
        console.error(t('error.fetchingSiteStatus') + ":", error);
        setSiteStatus({ status: false, loading: false });
      }
    };

    fetchSiteStatus();
  }, [t]);

  return (
    <SiteStatusContext.Provider value={siteStatus}>
      {children}
    </SiteStatusContext.Provider>
  );
};

export const useSiteStatus = () => {
  return useContext(SiteStatusContext);
};
