import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ProfileProvider } from './context/profileContext';
import { UserProvider } from './context/UserContext';
import NavBar from './components/NavBar/NavBar';
import UserPage from './pages/User/UserPage';
import Profile from './pages/Profile/Profile';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 60px)' }}>
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <div>
      <ProfileProvider>
        <UserProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<UserPage />} />
            <Route path="/" element={<UserPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
        </UserProvider>
      </ProfileProvider>
    </div>
  );
}

export default App;
