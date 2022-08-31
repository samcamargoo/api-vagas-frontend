import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { UsuarioCadastro } from "../models/UsuarioCadastro";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Box,
  useToast,
  Flex,
  Link,
  VStack,
  Text,
  HStack,
  Heading,
} from "@chakra-ui/react";
import "../assets/styles.css";
import { MenuApp } from "../components/Menu";
import { loginUsuario, postUsuario } from "../services/Usuario";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { UsuarioLogin } from "../models/UsuarioLogin";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioCadastro>();

  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit: SubmitHandler<UsuarioCadastro> = (data: UsuarioCadastro) => {
    const user = data;
    const login: UsuarioLogin = data;
    postUsuario(user)
      .then((success) => {
        toast.success("Usuario cadastrado com sucesso!", { autoClose: 1300 });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.data === "Email em uso") {
          const email = document.getElementById("email") as HTMLInputElement;

          document.getElementById("email")?.focus();
          email.style.borderColor = "red";
        }
        toast.error(error.response.data);
      });
  };

  function onError() {
    toast.error("*Campos obrigatórios");
  }

  return (
    <Flex
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <main>
        <Flex
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
          borderRadius="5px"
          maxWidth="500px"
          margin="auto"
          padding="20px"
        >
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Flex align="center" justify="center" mb="5px">
              <Heading as="h3" fontSize="20px">Cadastro de Usuário</Heading>
            </Flex>
            <FormControl >
              <Input
                id="nome"
                size="sm"
                placeholder="Nome*"
                {...register("nome", {
                  required: "Campo Obrigatório",
                })}
              />
            </FormControl>

            <FormControl  mt={2}>
              <Input
                id="sobrenome"
                placeholder="Sobrenome*"
                size="sm"
                {...register("sobrenome", {
                  required: "Campo Obrigatório",
                })}
              />
            </FormControl>

            <FormControl mt={2}>
              <Input
                id="email"
                placeholder="Email*"
                size="sm"
                {...register("email", {
                  required: "Campo Obrigatório",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email Inválido",
                  },
                })}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <FormErrorMessage>Email inválido.</FormErrorMessage>
            </FormControl>

            <FormControl mt={2}>
              <Input
                id="password"
                placeholder="Senha*"
                type="password"
                size="sm"
                {...register("password", {
                  required: "Campo Obrigatório",
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <Input
                id="telefone"
                placeholder="Celular*"
                size="sm"
                {...register("telefone", {
                  required: "Campo Obrigatório",
                })}
              />
            </FormControl>

            <Flex mt={1}>
              <HStack>
                <Text fontSize="12px">Já possui uma conta?</Text>
                <Link fontSize="12px" color="teal" as={ReachLink} to="/login">
                  Entre
                </Link>
              </HStack>
            </Flex>
            <Checkbox marginTop="10px" required>
              Li e aceito os <Link color="blue.500">Termos de Uso</Link>
            </Checkbox>

            <Checkbox marginTop="10px">
              Li e aceito a{" "}
              <Link color="blue.500">Política de Privacidade</Link>
            </Checkbox>

            <Checkbox
              {...register("aceitaInformacoesPorEmail")}
              marginTop="10px"
            >
              Aceito receber informações por email
            </Checkbox>

            <div className="btn-cadastrar">
              <Button
                mt={10}
                width="200px"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </Flex>
      </main>
    </Flex>
  );
}
