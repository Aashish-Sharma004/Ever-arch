import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Projects from './pages/Projects';
import About from './pages/About';
import './App.css'; 
import Contact from './pages/Contact';
import ScrollToTop from './components/common/ScrollToTop';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import ClientPortal from './pages/ClientPortal';


export default function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact /> } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/portal" element={<ClientPortal />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}