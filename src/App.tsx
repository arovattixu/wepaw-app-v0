import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import Layout from './components/Layout';
import { OfflineIndicator } from './components/common';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Layout>
            <AppRoutes />
            <OfflineIndicator />
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;