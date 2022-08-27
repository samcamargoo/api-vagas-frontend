import {
  AddIcon,
  CalendarIcon,
  EditIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Flex, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
export function NavItem() {
  return (
    <Flex mt={30} justifyContent="center" flexDir="column">
      <Menu>
        <Link as={ReachLink} to="/dashboard">
          <MenuButton mb={5}>
            <Flex alignItems="center" justifyContent="center">
              <EditIcon mr={2} />
              <Text>Dashboard</Text>
            </Flex>
          </MenuButton>
        </Link>

        <Link as={ReachLink} to="/vagas">
          <MenuButton mb={5}>
            <Flex alignItems="center" justifyContent="center">
              <CalendarIcon mr={2} />
              <Text>Vagas</Text>
            </Flex>
          </MenuButton>
        </Link>

        <Link as={ReachLink} to="/configuracoes">
          <MenuButton mb={5}>
            <Flex alignItems="center" justifyContent="center">
              <SettingsIcon mr={2} />
              <Text>Configurações</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
