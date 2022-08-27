import {
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

export function Footer() {
  return (
   
    <Flex position="absolute" justifyContent="center" bottom="0" left="0" width="100%">
        <footer>
            <Text color="teal" >Desenvolvido por Samuel Camargo</Text>
        </footer>
    </Flex>
    
  );
}
