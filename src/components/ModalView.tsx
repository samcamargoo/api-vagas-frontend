import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Vaga } from "../models/IVagas";

export function ModalView(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  function onError() {
    return toast.error("Campos Obrigátorios")
  }
  return (
    <>
     
    </>
  );
}
