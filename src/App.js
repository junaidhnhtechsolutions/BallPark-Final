import { BrowserRouter, Routes, Route } from "react-router-dom";
import Service from "./Pages/Service/Service";
import Notfound from "./Pages/Notfound";
import ScrollToTop from "./Pages/ScrollToTop";
import Profile from "./Pages/Profile/Profile";
import NewProject from "./Pages/NewProject/NewProject";
import ProjectDrawing from "./Pages/ProjectDrawing/ProjectDrawing";
import CostDrawing from "./Pages/Costdata/CostDrawing";
import ResultDrawing from "./Pages/Costdata/ResultDrawing";
import StartQuote from "./Pages/StartQuote/StartQuote";
import PostProject from "./Pages/PostProject/PostProject";
import Ballparkpicture from "./Pages/Ballparkpicture/Ballparkpicture";
import ResulteData from "./Pages/ResulteData/ResulteData";
import Offtheshelf from "./Pages/Offtheshelf/Offtheshelf";
import LoginForm from "./Auth/LoginForm";
import { useEffect, useState } from "react";
import NavPark from "./PagesNew/navigating-park";
import Ball from "./PagesNew/ball";
import ContactUs from "./PagesNew/Contactus";
import Home from "./PagesNew/Home";
import HomeLayout from "./layout/home-layout";
import MaterialList from "./Pages/MaterialList/MaterialList";

function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <>
        <div className="bg-white" />
      </>
    );
  }
  
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="Ballpark-picture" element={<Ballparkpicture />} />
                <Route path="navigating-park" element={<NavPark />} />
                <Route path="ball-park" element={<Ball />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="dashboard" element={<Service />} />
                <Route path="new-project" element={<NewProject />} />
                <Route path="profile" element={<Profile />} />
                <Route path="material-list" element={<MaterialList />} />
                <Route path="post-project" element={<PostProject />} />
                <Route path="cost-drawing" element={<CostDrawing />} />
                <Route path="result-drawing" element={<ResultDrawing />} />
                <Route path="project-drawing" element={<ProjectDrawing />} />
                <Route path="off-the-shelf" element={<Offtheshelf />} />
                <Route path="start-quote" element={<StartQuote />} />
                <Route path="result-data" element={<ResulteData />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="Ballpark-picture" element={<Ballparkpicture />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="navigating-park" element={<NavPark />} />
                <Route path="ball-park" element={<Ball />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="*" element={<LoginForm />} />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
