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
export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [usuario, setUsuario] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const onSubmit: SubmitHandler<UsuarioCadastro> = (data) => {
    const user = data;
    
       postUsuario(user)
      .then((success) => {
        toast.success("Usuario cadastrado com sucesso!", {autoClose: 1300});
        console.log("tentando logar usuario");
        loginUsuarioAposCadastro(data);
        
      })
      .catch((error) => {
        if (error.response.data === "Email em uso") {

          const email = document.getElementById('email') as HTMLInputElement
          
          document.getElementById("email")?.focus();
          email.style.borderColor = "red";
        }
        toast.error(error.response.data);
      });
  };

  function onError() {
    toast.error("*Campos obrigatórios");
  }

  function loginUsuarioAposCadastro(data: UsuarioLogin) {
    loginUsuario(data).then(res => {
      const jwt = res.data.token
      setAuth({usuario, password, jwt})
      navigate("/dashboard", {replace: true})
    }).catch(error => console.error("deu erro"));
  }

  return (
    <div>
      <main>
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="0.7px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.3)"
            borderRadius="5px"
            maxWidth="500px"
            margin="auto"
            padding="20px"
          >
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Flex align="center" justify="center" mb="5px">
                <h1>Cadastro de Usuário</h1>
              </Flex>
              <FormControl isInvalid={errors.nome}>
                <Input
                  id="nome"
                  size="sm"
                  placeholder="Nome*"
                  {...register("nome", {
                    required: "Campo Obrigatório",
                  })}
                />
              </FormControl>

              <FormControl isInvalid={errors.sobrenome} mt={2}>
                <Input
                  id="sobrenome"
                  placeholder="Sobrenome*"
                  size="sm"
                  {...register("sobrenome", {
                    required: "Campo Obrigatório",
                  })}
                />
              </FormControl>

              <FormControl isInvalid={errors.email} mt={2}>
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
                  onChange={(e) =>setUsuario(e.target.value)}
                  
                />
                <FormErrorMessage>Email inválido.</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password} mt={2}>
                <Input
                  id="password"
                  placeholder="Senha*"
                  type="password"
                  size="sm"
                  {...register("password", {
                    required: "Campo Obrigatório",
                  })}
                  onChange={(e) =>setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl isInvalid={errors.telefone} mt={2}>
                <Input
                  id="telefone"
                  placeholder="Celular*"
                  size="sm"
                  {...register("telefone", {
                    required: "Campo Obrigatório",
                  })}
                />
              </FormControl>

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
          </Box>
        </div>
      </main>
    </div>
  );
}
