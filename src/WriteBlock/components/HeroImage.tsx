import { Box, Flex, Image } from '@chakra-ui/react';
import { Users, UserCheck } from 'lucide-react';
import StatsCard from './StatsCard';

import heroImageSrc from '../images/hero.png'; 

function HeroImage() {
  return (
    <Box 
      flex={{ base: '1', lg: '1.5' }} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      mt={{ base: 8, lg: 0 }}
      order={{ base: 1, lg: 2}}
      data-aos="slide-left"
      data-aos-easing="ease-in-out-back"
      data-aos-duration="650"
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bg="purple.100"
        borderRadius="full"
        opacity={0.5}
      />

      <Image
        src={heroImageSrc}
        alt="Hero"
        zIndex={1}
        maxH="500px"
        w="auto"
        fallback={<Box w="300px" h="300px" bg="gray.200" borderRadius="full" />}
      />

      <Flex
        position="absolute"
        zIndex={2}
        gap={4}
        justifyContent="center"
        w="100%"
        bottom={{ base: 2, md: 4 }}
      >
        <StatsCard 
          icon={Users} 
          value="7" 
          label="кадетов в день" 
        />
        <StatsCard 
          icon={UserCheck} 
          value="200" 
          label="Вместимость: 200" 
        />
      </Flex>
    </Box>
  );
};

export default HeroImage;