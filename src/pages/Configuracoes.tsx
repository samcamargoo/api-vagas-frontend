import { Flex } from "@chakra-ui/react";
import { Configuracoes } from "../components/Configuracoes";
import { Sidebar } from "../components/Sidebar";

export function ConfiguracoesPage() {
  return (
    <>
      <Flex>
        <Flex ml={5}>
          <Sidebar />
        </Flex>

        <Flex>
          <Configuracoes />
        </Flex>
      </Flex>
    </>
  );
}
