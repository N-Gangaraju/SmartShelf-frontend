import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return loading ? <SplashScreen /> : <AppRoutes />;

}

export default App;