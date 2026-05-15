import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    Progress,
    Tooltip,
    Icon,
    HStack,
    VStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Image,
    useToast, 
    useClipboard, 
} from '@chakra-ui/react';
import { Info, Star, CheckCircle, Percent, Mouse } from 'lucide-react';

import faceImage from '../images/face.png';

interface clickerProps {
  maxClicks: number;
  discount: number;
  decrease: number;
  timeout: number;
}

function Clicker({maxClicks, discount, decrease, timeout} : clickerProps) {
  const [clicks, setClicks] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const progress = (clicks / maxClicks) * 100;
  const isComplete = clicks >= maxClicks;
  const toast = useToast();

  const { hasCopied, onCopy } = useClipboard("WHISTLER30");

  const handleCheekClick = () => {
    if (clicks < maxClicks) {
      setClicks(prev => prev + 1);
    }
  };

  const handleUseClick = () => {
    onCopy();
    toast({
        title: "Скопировано!",
        description: "Промокод добавлен в буфер обмена.",
        status: "success",
        duration: 2000,
        isClosable: false,
        position: "top-right",
    });
    onClose();
  }
  useEffect(() => {
        if (isComplete) return;

        const timer = setInterval(() => {
            setClicks(prev => Math.max(0, prev - decrease))
        }, timeout);
        
        return () => clearInterval(timer);
  }, [isComplete, decrease, timeout]);

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={5}
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      maxW="400px"
      mx="auto"
    >
      <Box display="flex" justifyContent="end">
        <Tooltip 
            hasArrow 
            label="Здесь ты можешь получить скидку просто кликая по экрану!!!"
            placement="bottom"
            w="150px"
            bg="white"
            color="gray.400"
            boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        >
            <Icon as={Info} size={20} color="gray.400" cursor="pointer"/>
        </Tooltip>
      </Box>

      <VStack gap={6}>
        <Text fontSize="xl" fontWeight="bold" color="black">
          Скидка за свист!
        </Text>

        {/* Картинка с кружками для клика */}
        <Box position="relative" w="200px" h="200px" mx="auto">
          {/* <Image
            src={faceImage}
            alt="Face"
            w="100%"
            h="100%"
            objectFit="contain"
          /> */}

          <Box
            position="absolute"
            w="200px"
            h="200px"
            bg="pink.300"
            borderRadius="full"
            cursor={clicks < maxClicks ? 'pointer' : 'default'}
            opacity={clicks >= maxClicks ? 0.5 : 1}
            _hover={clicks < maxClicks ? { transform: 'scale(1.1)' } : {}}
            transition="all 0.2s"
            onClick={handleCheekClick}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {
                clicks < maxClicks ? (<Icon as={Star} size={20} color="white" fill="yellow"/>) : (<></>)
            }
          </Box>
        </Box>

        <Text fontSize="md" color="gray.600" fontWeight="medium">
          Накликай себе скидку!
        </Text>

        <HStack 
            w="100%" 
            py={1}
            px={2} 
            boxShadow="0 4px 20px rgba(0,0,0,0.15)"
            gap={1} 
            border="1px solid" 
            borderColor="gray.300" 
            borderRadius="full"
        >
          <Text fontSize="md" color="black" w="120px" textAlign="center">
            <Text as="span" fontWeight="800" color="purple.600" fontSize="xl">{clicks}</Text> / {maxClicks}
          </Text>

          <Progress
            value={progress}
            w="100%"
            h="12px"
            borderRadius="full"
            colorScheme="purple"
            bg="gray.100"
          />
          <Box
            w="48px"
            h="32px"
            bg="purple.100"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={Star} size={16} color={isComplete ? "purple.500" : "gray.400"} fill={isComplete ? "yellow" : "transparent"}/>
          </Box>
        </HStack>

        <Flex
          w="100%"
          bg={isComplete ? "green.50" : "gray.50"}
          borderRadius="xl"
          p={4}
          justify="space-between"
          align="center"
          border="2px solid"
          borderColor={isComplete ? "green.200" : "gray.100"}
        >
          <Flex align="center" gap={2}>
            <Box bgGradient={isComplete ? "linear(to-t, green.400, green.200)" : "linear(to-t, green.300, green.100)"} p={2} borderRadius="lg">
              <Icon as={Percent} size={20} color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Скидка: {discount}%
            </Text>
          </Flex>
          
          <Button
            size="sm"
            bg={isComplete ? "green.400" : "gray.200"}
            color={isComplete ? "white" : "gray.500"}
            fontWeight="bold"
            borderRadius="lg"
            isDisabled={!isComplete}
            onClick={onOpen}
            _hover={isComplete ? { bg: "green.500" } : {}}
            rightIcon={!isComplete ? <Mouse size={16} /> : undefined}
            leftIcon={isComplete ? <CheckCircle size={16} /> : undefined}
          >
            {isComplete ? "Получить скидку" : "Кликай!"}
          </Button>
        </Flex>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" p={6} textAlign="center">
          <ModalCloseButton />
          <ModalBody>
            <Box
              w="50px"
              h="50px"
              bg="green.100"
              borderRadius="full"
              mx="auto"
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={CheckCircle} size={40} color="green.500" />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
              Поздравляем!
            </Text>
            <Text color="gray.600" mb={6}>
              Промокод на скидку <Text as="span" fontWeight="bold" color="green.500">{discount}%</Text> активен!
            </Text>
            <Box
              bg="gray.50"
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="xl"
              p={2}
              mb={4}
            >
              <Text fontSize="sm" color="gray.500" mb={1}>Твой промокод:</Text>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600" letterSpacing="2">WHISTLER{discount}</Text>
            </Box>
            <Button
              w="100%"
              bg="purple.600"
              color="white"
              borderRadius="xl"
              _hover={{ bg: "purple.500" }}
              onClick={handleUseClick}
            >
              Использовать сейчас
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Clicker;