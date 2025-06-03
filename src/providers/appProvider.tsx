'use client';

import React from 'react';

import ReactQueryProvider from './reactQueryProvider';
import ReduxProvider from './reduxProvider';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
