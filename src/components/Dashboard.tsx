import { Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as ReachLink } from 'react-router-dom';

import { Vaga } from '../models/IVagas';
import { getVagas } from '../services/Vagas';
import { Sidebar } from './Sidebar';

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
            <Flex
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="300px"
              height="200px"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
              borderRadius="lg"
            >
              <VStack>
                
                <Heading as="h3" size="md" textAlign="center">
                  Você não possui vagas cadastradas
                </Heading>
                
                <Link color="teal" fontSize="14px" as={ReachLink} to="/vagas">
                  Adicionar vaga
                </Link>
              </VStack>
            </Flex>
          ) : (
            <>
              <Flex
                alignItems="center"
                justifyContent="center"
                width="300px"
                height="200px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                borderRadius="lg"
                flexDir="column"
              >
                <Flex>
                  <Heading as="h3" size="md">
                    Vagas Cadastradas
                  </Heading>
                </Flex>

                <Flex
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="30px">{vagas.length}</Text>
                </Flex>
                <Flex>
                  <Link as={ReachLink} to="/vagas" color="teal" fontSize="14px">
                    <Text>Visualizar Vagas</Text>
                  </Link>
                </Flex>
              </Flex>

              <Flex
                alignItems="center"
                justifyContent="center"
                width="300px"
                height="200px"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                borderRadius="lg"
                flexDir="column"
                ml={2}
              >
                <Flex>
                  <Heading as="h3" size="md">
                    Candidaturas
                  </Heading>
                </Flex>

                <Flex
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="30px">0</Text>
                </Flex>
                <Flex>
                  <Link as={ReachLink} to="#" color="teal" fontSize="14px">
                    <Text>Visualizar Candidaturas</Text>
                  </Link>
                </Flex>
              </Flex>

            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
