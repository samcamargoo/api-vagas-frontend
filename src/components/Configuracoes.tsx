import { Button, Flex, FormControl, FormLabel, HStack, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export function Configuracoes() {
  const { register, reset, handleSubmit } = useForm();
  return (
    <>
      <Flex
        width="600px"
        mt={4}
        ml={5}
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
        //backgroundColor="blue"
        borderRadius="7px"
        justifyContent="center"
        pt={5}
      >
        <form>
          <VStack>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Sobrenome</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input type="password" />
            </FormControl>

            <FormControl>
              <FormLabel>Confirmar Senha</FormLabel>
              <Input type="password" />
            </FormControl>
          </VStack>
          <HStack>
            <Button colorScheme="teal" width="md" mt={2}>Salvar</Button>
          </HStack>
        </form>
      </Flex>
    </>
  );
}
