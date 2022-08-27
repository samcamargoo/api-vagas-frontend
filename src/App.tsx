import { ChakraProvider, Flex, Menu } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Configuracoes } from "./components/Configuracoes";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { MenuApp } from "./components/Menu";
import { RequireAuth } from "./components/RequireAuth";
import { ConfiguracoesPage } from "./pages/Configuracoes";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { VagasPage } from "./pages/Vagas";
import { AppRoutes } from "./routes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* rotas publicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<RegisterPage />} />

          {/* rotas privadas */}

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vagas" element={<VagasPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Route>
      </Routes>

      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
