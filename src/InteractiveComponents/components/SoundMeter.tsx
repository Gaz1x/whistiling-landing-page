import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  VStack,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { Mic, MicOff, Info, Trophy } from 'lucide-react';

const SoundMeter: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentDecibels, setCurrentDecibels] = useState(0);
  const [maxDecibels, setMaxDecibels] = useState(0);
  const [level, setLevel] = useState<'silent' | 'quiet' | 'normal' | 'loud' | 'legend'>('silent');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const toast = useToast();

  const getLevelByDecibels = (db: number): typeof level => {
    if (db < 30) return 'silent';
    if (db < 50) return 'quiet';
    if (db < 70) return 'normal';
    if (db < 90) return 'loud';
    return 'legend';
  };

  const getLevelText = (lvl: typeof level) => {
    const texts = {
      silent: 'Тишина',
      quiet: 'Тихо',
      normal: 'Средне',
      loud: 'Громко',
      legend: 'Легенда'
    };
    return texts[lvl];
  };

  const getLevelColor = (lvl: typeof level) => {
    const colors = {
      silent: 'gray.300',
      quiet: 'green.400',
      normal: 'yellow.400',
      loud: 'orange.500',
      legend: 'red.500'
    };
    return colors[lvl];
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      setMaxDecibels(0);
      setLevel('silent');
      
      analyzeAudio();
      
    } catch (err) {
      toast({
        title: 'Ошибка доступа',
        description: 'Не удалось получить доступ к микрофону',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    
    if (analyserRef.current) {
      analyserRef.current.disconnect();
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setIsListening(false);
    setCurrentDecibels(0);
  };

  const analyzeAudio = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    
    const db = Math.round(20 * Math.log10(average / 255) + 90);
    const clampedDb = Math.max(0, Math.min(100, db));
    
    setCurrentDecibels(clampedDb);
    
    setMaxDecibels(prev => (clampedDb > prev ? clampedDb : prev));
    
    setMaxDecibels(prev => {
      const newLevel = getLevelByDecibels(prev);
      setLevel(newLevel);
      return prev;
    });
    
    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const renderMeterBars = () => {
    const bars = [];
    const totalBars = 30;
    const activeBars = Math.round((maxDecibels / 100) * totalBars);
    
    for (let i = 0; i < totalBars; i++) {
      let barColor = 'gray.200';
      
      if (i < activeBars) {
        if (i < 10) barColor = 'green.400';
        else if (i < 18) barColor = 'yellow.400';
        else if (i < 24) barColor = 'orange.500';
        else barColor = 'red.500';
      }
      
      bars.push(
        <Box
          key={i}
          w="8px"
          h={i < 10 ? "24px" : i < 20 ? "28px" : "32px"}
          bg={barColor}
          borderRadius="full"
          transition="background-color 0.1s"
        />
      );
    }
    
    return bars;
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      w="400px"
      mx="auto"
      position="relative"
    >
      <Box position="absolute" top={4} right={4}>
        <Tooltip 
            hasArrow 
            label="Свистни так, чтобы весь мир услышал!"
            placement="bottom"
            w="150px"
            bg="white"
            color="gray.400"
            boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        >
          <Icon as={Info} size={20} color="gray.400" cursor="pointer" />
        </Tooltip>
      </Box>

      <VStack gap={6}>
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          Уровень свиста
        </Text>

        <Box
          w="100px"
          h="100px"
          bg={isListening ? "purple.500" : "purple.100"}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: isListening ? 'scale(1.05)' : 'scale(1.1)' }}
          onClick={isListening ? stopListening : startListening}
          boxShadow={isListening ? "0 0 30px rgba(168, 85, 247, 0.5)" : "none"}
        >
          {isListening ? (
            <Mic size={48} color="white" />
          ) : (
            <MicOff size={48} color="#a78bfa" />
          )}
        </Box>

        <Text fontSize="sm" color="gray.600">
          {isListening ? 'Микрофон активен' : 'Включить микрофон'}
        </Text>

        <Flex align="center" gap={2}>
          <Text fontSize="4xl" fontWeight="bold" color="gray.800">
            {maxDecibels}
          </Text>
          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            дБ (макс.)
          </Text>
        </Flex>

        <Box position="relative" w="100%">
          <Flex justify="space-between" align="center" gap={1}>
            {renderMeterBars()}
          </Flex>
          
          <Flex justify="space-between" mt={2} px={1}>
            <Text fontSize="xs" color="gray.500">Тихо</Text>
            <Text fontSize="xs" color="gray.500">Громко</Text>
            <Text fontSize="xs" color="gray.500">Легенда</Text>
          </Flex>
        </Box>

        <Flex
          w="100%"
          bg={level === 'legend' || level === 'loud' ? "purple.50" : "gray.50"}
          borderRadius="xl"
          p={4}
          align="center"
          gap={3}
          border="2px solid"
          borderColor={level === 'legend' || level === 'loud' ? "purple.200" : "gray.100"}
        >
          <Box
            w="40px"
            h="40px"
            bg={level === 'legend' || level === 'loud' ? "purple.500" : "gray.300"}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={Trophy} size={20} color="white" />
          </Box>
          <Text fontSize="md" color="gray.700">
            Твой уровень:{' '}
            <Text as="span" fontWeight="bold" color={getLevelColor(level)}>
              {getLevelText(level)}
            </Text>
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SoundMeter;