import { Container, Flex, Box } from '@chakra-ui/react';
import HeroContent from './components/HeroContent';
import HeroImage from './components/HeroImage';

function WriteBlock() {
  return (
    <Box py={4} bg="white">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={{base: 4, lg: 0}}
        >
          <HeroContent price={1500} discount={30} validPromo='WHISTLER30'/>
          <HeroImage />
        </Flex>
      </Container>
    </Box>
  );
};

export default WriteBlock;