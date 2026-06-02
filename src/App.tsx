import Navbar from "./components/Navbar";
import WriteBlock from "./WriteBlock/WriteBlock";
import AboutBlock from "./AboutBlock/AboutBlock";
import InteractiveComponents from "./InteractiveComponents/InteractiveComponents";
import CommentsBlock from "./CommentsBlock/CommentsBlock";
import Footer from "./components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
    })
  }, [])

  return (
    <>
      <Navbar/>
      <WriteBlock/>
      <AboutBlock/>
      <InteractiveComponents/>
      <CommentsBlock/>
      <Footer/>
    </>
  );
}

export default App;
