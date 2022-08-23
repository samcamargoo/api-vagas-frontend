import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { EditIcon } from "@chakra-ui/icons";
import { NavItem } from "./NavItem";

export function Sidebar() {
  const { auth } = useAuth();

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.3)"
      w="200px"
      flexDir="column"
      justifyContent="space-between"
      borderRadius="7px"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="center"
        mb={4}
        justifyContent="center"
      >
        <Flex align="center" mt={4}>
          <Avatar size="sm" />
          <Flex
            flexDir="column"
            p="5px"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h3" size="sm">
              Bem Vindo(a)
            </Heading>
            <Flex flexDir="column" justifyContent="space-between">
              <Text>{auth.nome}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="center">
          <NavItem />
        </Flex>
      </Flex>
      
      <Flex justifyContent="center" alignItems="center" mb={5}>
        
        <Text>Logout</Text>
      </Flex>
    </Flex>
  );
}
