import { 
    Flex, 
    HStack, 
    Box, 
    Text, 
    Container,
    Image,
} from '@chakra-ui/react';

import paintSrc from "./images/paint.png";
import AboutCard from './components/AboutCard';
import { aboutData } from "./about";

function AboutBlock() {
  return (
    <Container maxW="container.xl" mb={8}>
        <Flex display="flex" direction="column" alignItems="center">
            <HStack display="flex" verticalAlign="center" mb={4}>
                <Image
                    src={paintSrc}
                    alt="Paint"
                    w={{ base: "80px", md: "120px" }} 
                    h="10px" 
                    fallback={<Box w="90px" h="15px" bg="yellow.400" mb={8}/>}
                    // mb={8}
                    sx={{
                    transform: "scaleY(-1)",
                    }}
                />
                <Text as="h1" fontSize={{base: "2xl", md:"4xl"}} fontWeight="900">О мастер классе</Text>
                <Image
                    src={paintSrc}
                    alt="Paint"
                    w={{ base: "80px", md: "120px" }} 
                    h="10px" 
                    fallback={<Box w="90px" h="15px" bg="yellow.400" mb={8}/>}
                    // mb={8}
                    sx={{
                    transform: "scaleY(-1) scaleX(-1)",
                    }}
                />
            </HStack>
            <Flex direction={{base: "column", md: "row"}}   justifyContent="center" gap={{base: 8, md: 10}} wrap="wrap">
                {
                    aboutData.map((value, idx) => {
                    return ( <AboutCard icon={value.icon} title={value.title} text={value.text} color={value.color} id={idx}/> )
                    })
                }
            </Flex>
        </Flex>
    </Container>
  );
};

export default AboutBlock;