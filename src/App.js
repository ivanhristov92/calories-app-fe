// MUI X - date time pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Server cache
import { QueryClient, QueryClientProvider } from 'react-query'

// Authorization
import { Auth0Provider } from "@auth0/auth0-react";
import {ServiceProvider} from "@service"
// Routing
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// Custom components
import ProtectedRoute from "@components/ProtectedRoute"

// Pages
import Home from "./pages/Home/Home"
import AdminEntriesList from "./pages/admin/AdminEntriesList/AdminEntriesList"
import AdminManageMeals from "./pages/admin/AdminManageMeals/AdminManageMeals"
import AdminReports from "./pages/admin/AdminReports/AdminReports"
import Layout from '@components/layout/Layout';
import {WaitForAuthorizedService} from "@service";
import Login from './pages/Login/Login';

function AppProviders({children}){
  const queryClient = new QueryClient()

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirectUri={window.location.origin}
  >
    <ServiceProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LocalizationProvider>
    </ServiceProvider>

  </Auth0Provider>
  )
}


function App() {


  return (
    <AppProviders>
          <Router>
            <Layout>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={
                      <ProtectedRoute>
                        <WaitForAuthorizedService>
                            <Home />
                        </WaitForAuthorizedService>
                      </ProtectedRoute>


                    } />
                  <Route path="/admin" element={ 
                    <ProtectedRoute adminOnly={true}>
                      <WaitForAuthorizedService>
                          <AdminEntriesList />
                      </WaitForAuthorizedService>
                    </ProtectedRoute>

                  } />
                  <Route path="/admin/meals" element={
                    <ProtectedRoute adminOnly={true}>
                      <WaitForAuthorizedService>
                        <AdminManageMeals />
                      </WaitForAuthorizedService>
                    </ProtectedRoute>
                    } />
                  <Route path="/admin/reports" element={
                      <ProtectedRoute adminOnly={true}>
                        <WaitForAuthorizedService>
                            <AdminReports /> 
                        </WaitForAuthorizedService>
                      </ProtectedRoute>
                    } />
                </Routes>
            </Layout>  
          </Router>
    </AppProviders>
  );
}

export default App;