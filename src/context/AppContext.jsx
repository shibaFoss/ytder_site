import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [stars, setStars] = useState(0);
  const [versionData, setVersionData] = useState({
    latest_version: 'v2.5.0',
    latest_apk_url: '#',
  });

  useEffect(() => {
    // 1. Fetch GitHub Stars
    fetch('https://api.github.com/repos/shibaFoss/AIO-Video-Downloader')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) setStars(data.stargazers_count);
      })
      .catch(err => console.error('Error fetching stars:', err));

    // 2. Fetch Version Info
    fetch('https://raw.githubusercontent.com/shibaFoss/AIO-Video-Downloader/refs/heads/master/others/version_info.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const data = {};
        lines.forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) data[key.trim()] = value.trim();
        });
        if (data.latest_version) setVersionData(data);
      })
      .catch(err => console.error('Error fetching version info:', err));
  }, []);

  const trackDownload = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'download_click', {
        'event_category': 'Engagement',
        'event_label': 'APK Download',
        'value': 1,
        'version': versionData.latest_version
      });
    }
  };

  return (
    <AppContext.Provider value={{ stars, versionData, trackDownload }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
