import { Box, Text, Icon } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';

interface cardProps{ 
    icon: LucideIcon;
    title: string;
    text: string;
    color: string;
    id: number;
}

function AboutCard({icon: IconComponent, title, text, color, id}: cardProps) {

    return (
        <>
            <Box
            bg="white"
            p={4}
            borderRadius="2xl"
            boxShadow="0 4px 20px rgba(0,0,0,0.05)"
            w={{ md: "200px", base: "200px"}}
            // h={{ md: "200px", base: "200px"}}
            textAlign="center"
            data-aos="slide-down"
            data-aos-delay={`${50 * id}`}
            >
            <Icon as={IconComponent} boxSize={{md: 8, base: 8}} color={color}/>
            <Text fontSize={{md: "2xl", base: "2xl"}} fontWeight="bold" color="gray.800">
                {title}
            </Text>
            <Text fontSize={{md: "xl", base: "xl"}} color="gray.500" lineHeight="1.2">
                {text}
            </Text>
        </Box>
        </>
    )
}

export default AboutCard;