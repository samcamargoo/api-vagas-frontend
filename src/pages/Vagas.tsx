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
import { Footer } from "../components/Footer";
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
          <VagaBoard />
        </Flex>
      </Flex>

      
    </>
  );
}
