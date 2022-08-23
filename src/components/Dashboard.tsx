import { Badge, Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Vaga } from "../models/IVagas";
import axios from "axios";
import { getVagas } from "../services/Vagas";
import { Link as ReachLink } from "react-router-dom";
export function Dashboard() {
  document.title = "Dashboard";

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [remotas, setRemotas] = useState<Vaga[]>([]);

  function fetchVagas() {
    getVagas().then((res) => {
      setVagas(res.data);
    });
  }

  useEffect(() => {
    fetchVagas();
  }, []);

  return (
    <>
      <Flex>
        <Flex ml={5}>
          <Sidebar />
        </Flex>

        <Flex ml={5} mt={5}>
          {vagas.length < 1 ? (
            <Text>Você não possui vagas cadastradas</Text>
          ) : (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="300px"
                height="200px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                borderRadius="lg"
                flexDir="column"
                _hover={{
                  background: "teal.100",
                  cursor: "pointer",
                }}
              >
                <Box>
                  <Heading as="h3" size="md">
                    Vagas Cadastradas
                  </Heading>
                </Box>

                <Box
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="30px">{vagas.length}</Text>
                </Box>
                <Box>
                  <Link as={ReachLink} to="/vagas">
                    <Text>Visualizar Vagas</Text>
                  </Link>
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                width="300px"
                height="200px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                borderRadius="lg"
                flexDir="column"
                ml={2}
              ></Box>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
