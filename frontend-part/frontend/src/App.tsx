import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


import Navbar from "./components/navbar";
import Register from "./pages/register";
import Login from "./pages/login";
import SubmitDocument from "./pages/submitDocument";
import MyDocuments from "./pages/myDocument";
import ReviewQueue from "./pages/reviewQueue";
import DocumentDetails from "./pages/documentDetails";

function Layout() {
  const location = useLocation();

  // pages where navbar should NOT appear
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/submit" element={<SubmitDocument />} />

        <Route path="/my-documents" element={<MyDocuments />} />

        <Route path="/review" element={<ReviewQueue />} />

        <Route path="/documents/:id" element={<DocumentDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;