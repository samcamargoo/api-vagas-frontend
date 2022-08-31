import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UsuarioLogin } from "../models/UsuarioLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Link as ChakraLink,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { loginUsuario, setUsuarioLogado } from "../services/Usuario";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../services/api";
import { toast } from "react-toastify";
import {Link as ReachLink} from "react-router-dom"

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
  } = useForm<UsuarioLogin>();

  const onSubmit: SubmitHandler<UsuarioLogin> = (data: UsuarioLogin) => {
    loginUsuario(data)
      .then((success) => {
        const tokenJwt = success.data.token;
        const nome = success.data.nome;
        setAuth({ usuario, password, tokenJwt, nome });
        setToken(tokenJwt);
        navigate("/dashboard", { replace: true });
        setUsuario("");
        setPassword("");
      })
      .catch((error) => {
        toast.error("Erro ao logar", { autoClose: 1000 });
      });
  };

  return (
    <main>
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Box
          width="400px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
          borderRadius="7px"
          maxWidth="600px"
          margin="auto"
          padding="20px"
        >
          
          <form onSubmit={handleSubmit(onSubmit)}>
          <Flex align="center" justify="center" mb="5px">
              <Heading as="h3" fontSize="20px">Bem vindo(a)</Heading>
            </Flex>
            <FormControl>
              <Input
                id="email"
                size="sm"
                placeholder="Email"
                {...register("email", { required: "Campo Obrigatorio" })}
                onChange={(e) => setUsuario(e.target.value)}
              />
              
            </FormControl>

            <FormControl mt={2} mb={2}>
              <Input
                id="password"
                size="sm"
                placeholder="Senha"
                type="password"
                {...register("password", { required: "Campo Obrigatorio" })}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Flex>
              <HStack>
                <Text fontSize="12px">Nao possui uma conta?</Text>
                <Link as={ReachLink} to="/cadastro" color="teal" fontSize="12px">
                  Cadastre-se
                </Link>
              </HStack>
            </Flex>
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
      </Flex>
    </main>
  );
}
