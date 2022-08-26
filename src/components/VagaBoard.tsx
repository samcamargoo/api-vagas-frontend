import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  StarIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
import { SubmitHandler, useForm } from "react-hook-form";
import { Vaga } from "../models/IVagas";
import {
  cadastrarVaga,
  deletarVaga,
  editarVaga,
  getVagas,
} from "../services/Vagas";
import { ModalView } from "./ModalView";
import { toast } from "react-toastify";

export function VagaBoard() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAdicionarOpen,
    onOpen: onAdicionarOpen,
    onClose: onAdicionarClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [vaga, setVaga] = useState<Vaga>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const modelos: string[] = ["REMOTO", "PRESENCIAL", "HIBRIDO"];

  useEffect(() => {
    listVagas();
  }, [vaga]);

  function listVagas() {
    getVagas()
      .then((res) => setVagas(res.data))
      .catch();
  }

  const addVaga: SubmitHandler<Vaga> = (data) => {
    console.log(data);
    cadastrarVaga(data).then((res) => {
      listVagas();
      onAdicionarClose();
    });
  };

  const putVaga: SubmitHandler<Vaga> = (data) => {
    console.log(data);
    editarVaga(data.id, data)
      .then((res) => {
        onClose();
        toast.success("Vaga editada com sucesso!", { autoClose: 1000 });
        reset();
        listVagas();
      })
      .catch((error) => {
        toast.error("*Campos Obrigatórios", { autoClose: 1000 });
      });
  };

  function deleteVaga(id: number) {
    console.log(id);
    deletarVaga(id).then(() => {
      toast.success("Vaga deletada com sucesso!", {autoClose: 1000});
      listVagas();
    }).catch(() => {
      toast.error("Erro ao deletar vaga");
    });
  }

  function onError() {
    toast.error("*Campos obrigatórios");
  }

  return (
    <>
      {/*Modal de edição de vaga */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex">
            {" "}
            Editar Vaga
            <Spacer />
            <IconButton
              background="none"
              aria-label="fechar"
              icon={<CloseIcon />}
              w="2px"
              onClick={() => {
                reset();
                onClose();
              }}
            ></IconButton>
          </ModalHeader>

          <form onSubmit={handleSubmit(putVaga)}>
            <ModalBody>
              <VStack>
                <FormControl>
                  <Input
                    type="hidden"
                    value={vaga?.id}
                    {...register("id")}
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Cargo*</FormLabel>
                  <Input
                    defaultValue={vaga?.cargo}
                    {...register("cargo")}
                  ></Input>
                </FormControl>

                <FormControl>
                  <FormLabel>Descrição*</FormLabel>
                  <Textarea
                    overflow="hidden"
                    {...register("descricao")}
                    defaultValue={vaga?.descricao}
                  ></Textarea>
                </FormControl>

                <FormControl>
                  <FormLabel>Modelo*</FormLabel>
                  <Select {...register("modelo")}>
                    {vaga?.modelo === "REMOTO" ? (
                      <>
                        <option value={vaga?.modelo}>{vaga?.modelo}</option>
                        <option value="HIBRIDO">HIBRIDO</option>
                        <option value="PRESENCIAL">PRESENCIAL</option>
                      </>
                    ) : vaga?.modelo === "HIBRIDO" ? (
                      <>
                        <option value={vaga?.modelo}>{vaga?.modelo}</option>
                        <option value="REMOTO">REMOTO</option>
                        <option value="PRESENCIAL">PRESENCIAL</option>
                      </>
                    ) : (
                      <>
                        <option value={vaga?.modelo}>{vaga?.modelo}</option>
                        <option value="REMOTO">REMOTO</option>
                        <option value="HIBRIDO">HIBRIDO</option>
                      </>
                    )}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Senioridade*</FormLabel>
                  <Select
                    {...register("senioridade", {
                      required: "Campo Obrigatorio",
                    })}
                  >
                    {vaga?.senioridade === "ESTAGIO" ? (
                      <>
                        <option value={vaga?.senioridade}>
                          {vaga?.senioridade}
                        </option>
                        <option value="JUNIOR">JUNIOR</option>
                        <option value="PLENO">PLENO</option>
                        <option value="SENIOR">SENIOR</option>
                      </>
                    ) : vaga?.modelo === "JUNIOR" ? (
                      <>
                        <option value={vaga?.senioridade}>
                          {vaga?.senioridade}
                        </option>
                        <option value="ESTAGIO">ESTAGIO</option>
                        <option value="PLENO">PLENO</option>
                        <option value="SENIOR">SENIOR</option>
                      </>
                    ) : vaga?.modelo === "PLENO" ? (
                      <>
                        <option value={vaga?.senioridade}>
                          {vaga?.senioridade}
                        </option>
                        <option value="ESTAGIO">ESTAGIO</option>
                        <option value="JUNIOR">JUNIOR</option>
                        <option value="SENIOR">SENIOR</option>
                      </>
                    ) : (
                      <>
                        <option value={vaga?.senioridade}>
                          {vaga?.senioridade}
                        </option>
                        <option value="ESTAGIO">ESTAGIO</option>
                        <option value="JUNIOR">JUNIOR</option>
                        <option value="PLENO">PLENO</option>
                      </>
                    )}
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                ml={2}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Editar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/*Modal de adiçao de vaga */}
      <Modal isOpen={isAdicionarOpen} onClose={onAdicionarClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex">
            {" "}
            Adicionar Vaga
            <Spacer />
            <IconButton
              background="none"
              aria-label="fechar"
              icon={<CloseIcon />}
              w="2px"
              onClick={() => {
                reset();
                onAdicionarClose();
              }}
            ></IconButton>
          </ModalHeader>

          <form onSubmit={handleSubmit(addVaga)}>
            <ModalBody>
              <VStack>
                <FormControl></FormControl>
                <FormControl>
                  <FormLabel>Cargo*</FormLabel>
                  <Input {...register("cargo")}></Input>
                </FormControl>

                <FormControl>
                  <FormLabel>Descrição*</FormLabel>
                  <Textarea {...register("descricao")}></Textarea>
                </FormControl>

                <FormControl>
                  <FormLabel>Modelo*</FormLabel>
                  <Select
                    {...register("modelo")}
                    placeholder="Selecione Modelo"
                  >
                    <option value="REMOTO">REMOTO</option>
                    <option value="HIBRIDO">HIBRIDO</option>
                    <option value="PRESENCIAL">PRESENCIAL</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Senioridade*</FormLabel>
                  <Select
                    placeholder="Selecione senioridade"
                    {...register("senioridade", {
                      required: "Campo Obrigatorio",
                    })}
                  >
                    <option value="ESTAGIO">ESTAGIO</option>
                    <option value="JUNIOR">JUNIOR</option>
                    <option value="PLENO">PLENO</option>
                    <option value="SENIOR">SENIOR</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  reset();
                  onAdicionarClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                ml={2}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Adicionar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/*Modal de confirmar exclusão de vaga */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              {" "}
              Tem certeza que deseja deletar a vaga?
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button onClick={onDeleteClose}>Cancelar</Button>
              <Button
                colorScheme="red"
                ml={2}
                onClick={() => {
                  deleteVaga(vaga?.id);
                  onDeleteClose();
                }}
              >
                Sim
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Flex
        maxWidth="600px"
        ml={5}
        mt={4}
        borderRadius="7px"
        justifyContent="center"
      >
        <Flex ml={2} wrap="wrap" width="700px" overflow="hidden" padding="3">
          <Flex mb={1}>
            <Button
              background="teal.300"
              _hover={{
                background: "teal.400",
              }}
              onClick={onAdicionarOpen}
            >
              Adicionar Vaga
            </Button>
          </Flex>

          {vagas.map((vaga, index) => (
            <>
              <Flex
                backgroundColor="white"
                width="100%"
                flexDirection="column"
                mb={3}
                justifyContent="space-between"
                borderRadius="7px"
                height="300px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                _hover={{
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
                  <Text noOfLines={4}>{vaga.descricao}</Text>
                </Flex>

                <Flex>
                  <HStack>
                    <Badge mr={1} colorScheme="green" borderRadius="full">
                      {vaga.modelo}
                    </Badge>

                    <Badge colorScheme="purple" borderRadius="full">
                      {vaga.senioridade}
                    </Badge>
                  </HStack>
                  <Spacer />
                  <Flex>
                    <IconButton
                      onClick={() => {
                        setVaga(vaga);
                        onDeleteOpen();
                      }}
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
                      onClick={() => {
                        setVaga(vaga);
                        onOpen();
                      }}
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
                  </Flex>
                </Flex>
              </Flex>
            </>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
