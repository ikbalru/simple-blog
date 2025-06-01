'use client';

import React from 'react';

import ReactQueryProvider from './reactQueryProvider';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default AppProvider;
