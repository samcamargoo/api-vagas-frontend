import { Badge, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Vaga } from "../models/IVagas";
import { getVagas } from "../services/Vagas";

export function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    listVagas();
  }, []);

  function listVagas() {
    getVagas()
      .then((res) => setVagas(res.data))
      .catch();
  }

  console.log(vagas);

  return (
    <>
      <Flex>
        <Flex ml={5}>
          <Sidebar />
        </Flex>
        <Flex mt={5} ml={5} flexDir="column">
            <Button colorScheme="teal">Adicionar vaga</Button>
          <Box display="flex" justifyContent="center" mt={2}>
            <Box>
              {vagas.map((vaga) => (
                <Box width="300px" height="200px" boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)" borderRadius="lg" mb={5} justifyContent="space-between" >
                    <Box display="flex" justifyContent="center">
                       <Heading as="h3" fontSize="15px" mt={3}>{vaga.titulo}</Heading> 
                    </Box>
                    <Box display="flex" ml={1} mt={5}>
                        {vaga.descricao}
                    </Box>
                    <Box mt={11}>
                        <Badge colorScheme="green" borderRadius="full" fontSize="11px">{vaga.modelo.toLowerCase()}</Badge>
                        <></>
                    </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
