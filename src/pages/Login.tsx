import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UsuarioLogin } from "../models/UsuarioLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { loginUsuario, setUsuarioLogado } from "../services/Usuario";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../services/api";
import { toast } from "react-toastify";

export function LoginPage() {
  const { setAuth } = useAuth();

  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<UsuarioLogin> =  (data) => {
       loginUsuario(data)
      .then((success) => {
        const tokenJwt = success.data.token;
        setAuth({ usuario, password, tokenJwt });
        setToken(tokenJwt);
        navigate("/dashboard", { replace: true });
        setUsuario("");
        setPassword("");
        
      })
      .catch((error) => {
        toast.error("Erro ao logar", {autoClose: 1000})
      });
  };

  return (
    <main>
      <div className="card-post">
        <h1>Login</h1>
        <div></div>
        <div className="card-body-post">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="0.7px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.3)"
            borderRadius="5px"
            maxWidth="600px"
            margin="auto"
            padding="20px"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <Input
                  id="email"
                  size="sm"
                  placeholder="Email"
                  {...register("email", { required: "Campo Obrigatorio" })}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </FormControl>

              <FormControl isInvalid={errors.password} mt={2} mb={2}>
                <Input
                  id="password"
                  size="sm"
                  placeholder="Senha"
                  type="password"
                  {...register("password", { required: "Campo Obrigatorio" })}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <div>
                <ChakraLink color="blue.500" fontSize="15px">
                  Esqueci minha senha
                </ChakraLink>
              </div>
              <Button
                mt={8}
                width="200px"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Entrar
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </main>
  );
}
