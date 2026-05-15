import Navbar from "./components/Navbar";
import WriteBlock from "./WriteBlock/WriteBlock";
import Clicker from "./InteractiveComponents/components/Clicker";

import { Box } from "@chakra-ui/react"; 
function App() {
  return (
    <>
      <Navbar/>
      <WriteBlock/>
      <Clicker maxClicks={20} discount={30} decrease={1} timeout={400}/>
      <Box w="100px" h="1000px"/>
    </>
  );
}

export default App;
