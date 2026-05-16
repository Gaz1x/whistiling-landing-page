import { Image, Container, Box, Flex, Text, Link, HStack, VStack, Divider, Icon } from "@chakra-ui/react";
import { Phone, Mail, MapPin} from "lucide-react";
import footerSrc from "./images/footerCropped.png";
import fullLogoSrc from "./images/logo.jpg";

function Footer() {
    return (
        <Container maxW="container.xl" py={2} position="relative">
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                w="100%"
                h="auto"
                overflow="hidden"
                pointerEvents="none"
                opacity={0.1}
                zIndex={0}
            >
                <Image
                    src={footerSrc}
                    alt="Footer decoration"
                    w="100%"
                    h="auto"
                    objectFit="cover"
                />
            </Box>
            <Box position="relative" zIndex={1}>
                <Divider mb={2} borderColor="gray.300" />
                <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>       
                                        
                    <VStack align="start" gap={4}>
                        {/* <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                            Академия свиста
                        </Text> */}
                        <Text fontSize="sm" color="gray.600" maxW="300px">
                            Обучаем искусству свиста двумя пальцами с 8 марта 2026 года. 
                            Более 7 выпускников по всей стране.
                        </Text>
                        
                        <VStack align="start" gap={2} mt={2}>
                            <HStack gap={2}>
                                <Icon as={Phone} size={16} color="purple.500" />
                                <Text fontSize="sm" color="gray.700">+7 (999) 123-45-67</Text>
                            </HStack>
                            <HStack gap={2}>
                                <Icon as={Mail} size={16} color="purple.500" />
                                <Text fontSize="sm" color="gray.700">number_one_whistler@mail.ru</Text>
                            </HStack>
                            <HStack gap={2} display={"flex"} alignItems={"flex-start"}>
                                <Icon as={MapPin} size={16} color="purple.500" />
                                <Text fontSize="sm" color="gray.700">Приморский край, Владивосток, <br/>Дальневосточный федеральный университет, <br/>корпус D, аудитория D421(D542)</Text>
                            </HStack>
                        </VStack>
                    </VStack>

                    <Box display={"flex"} alignItems={"center"}>
                        <Image
                            src={fullLogoSrc}
                            alt="Logo"
                            h="200px"
                            w="auto"
                            objectFit="cover"
                        />
                    </Box>
                    <VStack align="start" gap={3}>
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                            Мы в соцсетях
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                            Подписывайтесь, чтобы не пропустить новости
                        </Text>
                        <HStack gap={3} mt={2}>
                            <Box 
                                as="a" 
                                w={10} 
                                h={10} 
                                bg="purple.100" 
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                _hover={{ bg: "purple.200", transform: "scale(1.1)" }}
                                transition="all 0.2s"
                            >
                                <Icon as={Mail} size={20} color="purple.600" />
                            </Box>
                            <Box 
                                w={10} 
                                h={10} 
                                bg="purple.100" 
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                _hover={{ bg: "purple.200", transform: "scale(1.1)" }}
                                transition="all 0.2s"
                            >
                                <Icon as={Mail} size={20} color="purple.600" />
                            </Box>
                            <Box 
                                w={10} 
                                h={10} 
                                bg="purple.100" 
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                _hover={{ bg: "purple.200", transform: "scale(1.1)" }}
                                transition="all 0.2s"
                            >
                                <Icon as={Mail} size={20} color="purple.600" />
                            </Box>
                        </HStack>
                    </VStack>
                </Flex>

                <Divider mt={2} borderColor="gray.300" />
            </Box>
        </Container>
    );
}

export default Footer;