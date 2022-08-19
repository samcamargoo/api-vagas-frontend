import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Login } from "./components/Login";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { RequireAuth } from "./components/RequireAuth";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { VagasPage } from "./pages/Vagas";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<RegisterPage />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vagas" element={<VagasPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
