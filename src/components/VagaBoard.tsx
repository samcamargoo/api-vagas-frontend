import { DeleteIcon, EditIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Vaga } from "../models/IVagas";
import { deletarVaga, getVagas } from "../services/Vagas";
import { ModalView } from "./ModalView";

export function VagaBoard() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vaga, setVaga] = useState<Vaga>();

  useEffect(() => {
    listVagas();
  }, []);

  function listVagas() {
    getVagas()
      .then((res) => setVagas(res.data))
      .catch();
  }

  function editVaga(vaga: Vaga) {
    setVaga(vaga);
    onOpen()
  }

  function deleteVaga(id: number) {
    deletarVaga(id).finally(() => {
      listVagas();
    });
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
              <VStack>
              <Input type="text" value={vaga?.cargo}/>
              <Textarea value={vaga?.descricao}/>
              <Select>
                
              </Select> 
              </VStack> 
              </form>  
            </ModalBody>
          </ModalHeader>
        </ModalContent>
      </Modal>
      <Flex
        width="1000px"
        ml={3}
        mt={4}
        borderRadius="7px"
        justifyContent="center"
      >
        <Flex ml={2} wrap="wrap">
          {vagas.map((vaga, index) => (
            <>
              <Flex
                width="300px"
                mr={2}
                justifyContent="space-between"
                borderRadius="7px"
                height="300px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.1)"
                _hover={{
                  background: "teal.100",
                  cursor: "pointer",
                }}
                flexDir="column"
                p="1"
                key={index}
              >
                <Flex flexDir="column" justifyContent="center" mt={3}>
                  <Heading as="h3" fontSize="15px" align="center">
                    {vaga.cargo}
                  </Heading>
                </Flex>

                <Flex>
                  <Text noOfLines={3}>{vaga.descricao}</Text>
                </Flex>
                <Flex mt={3}>
                  <HStack>
                    <Badge colorScheme="green" borderRadius="full">
                      {vaga.modelo}
                    </Badge>
                    <Badge colorScheme="purple" borderRadius="full">
                      {vaga.senioridade}
                    </Badge>
                  </HStack>
                  <Spacer />
                  <Flex>
                    <Text fontSize="10px">
                      Adicionada em: {vaga.adicionadaEm}
                    </Text>
                  </Flex>
                </Flex>
                <Flex mb={3}>
                  <HStack>
                    <IconButton
                      onClick={() => deleteVaga(vaga.id)}
                      _hover={{
                        background: "none",
                      }}
                      _active={{
                        background: "none",
                      }}
                      background="none"
                      aria-label="Search database"
                      icon={
                        <DeleteIcon
                          color="red.400"
                          _hover={{
                            color: "red.600",
                          }}
                        />
                      }
                    />

                    <IconButton
                      onClick={() => editVaga(vaga)}
                      _hover={{
                        background: "none",
                      }}
                      _active={{
                        background: "none",
                      }}
                      background="none"
                      aria-label="Search database"
                      icon={<EditIcon _hover={{}} />}
                    />

                    <IconButton
                      onClick={() => deleteVaga(vaga.id)}
                      _hover={{
                        background: "none",
                      }}
                      _active={{
                        background: "none",
                      }}
                      background="none"
                      aria-label="Search database"
                      icon={<ViewIcon _hover={{}} />}
                    />
                  </HStack>
                </Flex>
              </Flex>
            </>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
