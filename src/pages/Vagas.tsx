import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Modal } from "../components/ModalView";
import { Sidebar } from "../components/Sidebar";
import { VagaBoard } from "../components/VagaBoard";
import { Vaga } from "../models/IVagas";
import { getVagas } from "../services/Vagas";

export function VagasPage() {

  return (
    <>
      <Flex>
        <Flex ml={5}>
          <Sidebar />
        </Flex>


      <Flex>
        <VagaBoard/>
      </Flex>
        {/* <Flex mt={5} ml={5} flexDir="column">
          <Button colorScheme="teal">Adicionar vaga</Button>
            
           <Box > 
          <Box display="flex"  mt={2} maxWidth="600px"   backgroundColor="blue">
            <Box>
              {vagas.map((vaga) => (
                <Box
                  width="300px"
                  height="200px"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                  borderRadius="lg"
                  mb={5}
                  
                >
                  <Box display="flex" justifyContent="center">
                    <Heading as="h3" fontSize="15px" mt={3}>
                      {vaga.cargo}
                    </Heading>
                  </Box>
                  <Box display="flex" ml={1} mt={5} noOfLines={3}>
                    {vaga.descricao}
                  </Box>
                  <Box mt={11}>
                    <Badge
                      ml={1}
                      colorScheme="green"
                      borderRadius="full"
                      fontSize="11px"
                    >
                      {vaga.modelo}
                    </Badge>
                    <Badge
                      ml={1}
                      colorScheme="purple"
                      borderRadius="full"
                      fontSize="11px"
                    >
                      {vaga.senioridade}
                    </Badge>
                  </Box>
                </Box>
              ))}
            </Box>
            </Box>
          </Box>
        </Flex> */}
      </Flex>
    </>
  );
}
