import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export function Header() {
    return (
        <Flex p="5" align="center" gap="3">
            <Image src="" color="gray.500" alt="icone"/>
            <Flex direction="column">
                <Heading>Vagas</Heading>
                <Text>teste</Text>
            </Flex>
        </Flex>
    );
}