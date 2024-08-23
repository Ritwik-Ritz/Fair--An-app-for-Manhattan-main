import { useContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Map from './pages/Map'
import Settings from './pages/Settings'
import DailyForm from './pages/DailyForm';
import George from './pages/StGeorgesQuiz';
import Privacy from './pages/Privacy';
import UserDashboard from './pages/UserDashboard';
import { SettingsContext } from './context/SettingsContext';
import MainContent from './components/maincontent';
import { UserPanel } from './pages/UserPanel';
import ForgotPass from './pages/ForgotPassword';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import BetterLogin from './pages/BetterLogin';
import LoadingScreen from './components/loadingscreen';
import constant from './constant';

function App() {
  const { fontSize } = useContext(SettingsContext);

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ loading }) => {
          if (loading) {
            return (<LoadingScreen loadingtext = {constant.general.loading_site}/>);
          }

          return (
            <BrowserRouter>
              <Navbar />
              <div className="pages" style={{ fontSize: `${fontSize}px` }}>
                <CssBaseline />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path='/forgotpassword' element={<ForgotPass />} />
                    <Route path="/map" element={<Map />} />
                    <Route path='/login' element={<BetterLogin />} />
                    <Route path="/user" element={<ProtectedRoute element={<UserPanel />} />} />
                    <Route path="/user/dailyform" element={<ProtectedRoute element={<DailyForm />} />} />
                    <Route path="/user/stgeorgesquiz" element={<ProtectedRoute element={<George />} />} />
                    {/* <Route path="/user/dashboard" element={<ProtectedRoute element={<UserDashboard/>} />} /> */}


                    {/* No longer using user history */}
                    {/* <Route path="/user/history" element={<ProtectedRoute element={<UserHistory />} />} /> */}
                    {/* for testing uncomment below */}
                    {/* <Route path= "/user/dailyform" element={<DailyForm/>}/>
                    <Route path="/user/dashboard" element={<UserDashboard/>} /> */}
                  </Routes>
                </MainContent>
              </div>
              {/* <Footer/> */}
            </BrowserRouter>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
