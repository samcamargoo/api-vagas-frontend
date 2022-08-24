import {
    Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Vaga } from "../models/IVagas";

export function ModalView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
   
  return (
    <>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
