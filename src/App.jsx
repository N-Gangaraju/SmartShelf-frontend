import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import AppRoutes from "./routes/AppRoutes";
import{ ToastContainer } from "react-toastify";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return loading ? (<SplashScreen />) :(
    <> <AppRoutes />
   <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
    />
    </>
  );

}

export default App;