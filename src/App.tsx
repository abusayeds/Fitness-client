import { Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Footer from "./pages/Footer";

function App() {
  return (
    <div >
      <MainLayout></MainLayout>
      <div >
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
