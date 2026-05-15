import {
  Box,
  Flex,
  // IconButton,
  // Collapse,
  // Link,
  // useDisclosure,
  Container,
  Image,
} from '@chakra-ui/react';
// import { MapPin, Star, CircleHelp, Menu, X } from 'lucide-react';

import logo from './images/circleLogo.png';

// const links = [
//   { label: 'О мастер-классе', icon: MapPin, href: '#about' },
//   { label: 'Академия', icon: Star, href: '#academy' },
//   { label: 'FAQ', icon: CircleHelp, href: '#faq' },
// ];

// interface navbarProps {
//   pageActive: number;
// };

function Navbar() {
  // const { isOpen, onToggle } = useDisclosure();

  return (
    <Container 
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="white" 
      maxW="container.xl"
      mx="auto"
      borderBottom="2px solid" 
      borderColor="gray.100"
    >
      <Container maxW="100%" px={{ base: 4, md: 8 }} py={1}>
        <Flex h={20} justify="space-between" align="center" wrap="nowrap">
          <Flex align="center" gap={3} flexShrink={0}>
            <Box 
              w={12} 
              h={12} 
              bg="yellow.100" 
              borderRadius="full" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              overflow="hidden"
            >
              <Image 
                src={logo}
                alt="Логотип" 
                w="100%" 
                h="100%" 
                objectFit="cover"
                fallback={
                  <Box as="span" fontSize="xl">🎺</Box>
                }
              />
            </Box>
            <Box as="span" fontWeight="bold" fontSize="lg" color="gray.800" whiteSpace="nowrap">
              Академия свиста
            </Box>
          </Flex>

          <Flex 
            gap={8} 
            display={{ base: 'none', md: 'flex' }} 
            align="center"
            flexShrink={0}
          >
            {/* {links.map((item, idx) => (
              <Link 
                key={item.label} 
                href={item.href} 
                display="flex"
                alignItems="center" 
                gap={2} 
                color="gray.600" 
                fontSize="sm"
                fontWeight="500"
                textDecoration={idx + 1 === pageActive ? "underline" : "none !important"}
                _hover={{ color: 'gray.900' }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))} */}
          </Flex>

          {/* <IconButton
            aria-label="Menu"
            icon={isOpen ? <X size={20} /> : <Menu size={20} />}
            variant="ghost"
            size="sm"
            onClick={onToggle}
            display={{ base: 'flex', md: 'none' }}
            flexShrink={0}
          /> */}
        </Flex>

        {/* <Collapse in={isOpen}>
          <Box 
            pb={4} 
            display={{ base: 'block', md: 'none' }}
            mt={2}
          >
            {links.map((item, idx) => (
              <Link 
                key={item.label} 
                href={item.href} 
                display="flex" 
                alignItems="center" 
                gap={3} 
                py={3} 
                px={2}
                color="gray.700"
                fontWeight="medium"
                textDecoration={idx + 1 === pageActive ? "underline" : "none !important"}
                _hover={{ bg: 'gray.50', borderRadius: 'md' }}
                onClick={onToggle}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </Box>
        </Collapse> */}
      </Container>
    </Container>
  );
};

export default Navbar;