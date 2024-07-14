import { Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <div>
      <MainLayout></MainLayout>
       <div>
       <Outlet></Outlet>
       </div>
      <p>footer</p>
    </div>
  );
}

export default App;
