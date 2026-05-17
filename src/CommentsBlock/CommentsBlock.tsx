import { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  Container, 
  Flex, 
  Image, 
  IconButton 
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CommentCard from './components/CommentCard';
import { commentsData } from './commentsData';
import paintSrc from "./images/paint.png";

function CommentsBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    
    const handleScroll = () => {
      requestAnimationFrame(checkScroll);
    };

    el?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScroll);
    
    return () => {
      el?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <Container maxW="container.xl" mb={0} position="relative">
      <Flex direction="column" align="center" mb={8}>
        <Flex align="center" gap={{md: 3, base: 1}} mb={2} wrap="wrap" justify="center">
          <Image 
            src={paintSrc} 
            alt="Paint" 
            w={{ base: "80px", md: "120px" }} 
            h="10px" 
            sx={{ transform: "scaleY(-1)" }} 
          />
          <Text as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" textAlign="center">
            Отзывы участников
          </Text>
          <Image 
            src={paintSrc} 
            alt="Paint" 
            w={{ base: "80px", md: "120px" }} 
            h="10px" 
            sx={{ transform: "scaleY(-1) scaleX(-1)" }} 
          />
        </Flex>
      </Flex>

      <Flex align="center" gap={4}>
        <IconButton
          aria-label="Предыдущие отзывы"
          icon={<ChevronLeft size={20} />}
          variant="outline"
          borderRadius="full"
          w={10}
          h={10}
          onClick={() => scroll('left')}
          display={{ base: 'none', md: 'flex' }}
          isDisabled={!canScrollLeft}
          opacity={canScrollLeft ? 1 : 0.3}
          transition="opacity 0.2s"
          _hover={{ bg: 'gray.100' }}
        />

        <Box
          ref={scrollRef}
          overflowX="auto"
          flex="1"
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Flex gap={6} px={2} pb={4}>
            {commentsData.map((comment) => (
              <Box 
                key={comment.id} 
                flex="0 0 auto" 
                w={{ base: '280px', md: '320px' }}
              >
                <CommentCard
                  name={comment.name}
                  avatar={comment.avatar}
                  rating={comment.rating}
                  text={comment.text}
                />
              </Box>
            ))}
          </Flex>
        </Box>

        <IconButton
          aria-label="Следующие отзывы"
          icon={<ChevronRight size={20} />}
          variant="outline"
          borderRadius="full"
          w={10}
          h={10}
          onClick={() => scroll('right')}
          display={{ base: 'none', md: 'flex' }}
          isDisabled={!canScrollRight}
          opacity={canScrollRight ? 1 : 0.3}
          transition="opacity 0.2s"
          _hover={{ bg: 'gray.100' }}
        />
      </Flex>
    </Container>
  );
};

export default CommentsBlock;