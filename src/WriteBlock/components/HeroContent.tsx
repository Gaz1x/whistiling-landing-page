import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Box, 
  Text, 
  Button, 
  Image, 
  Flex, 
  Badge,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  HStack, 
  Divider,
} from '@chakra-ui/react';
import { ArrowRight, Calendar, User, Phone, Check, Mail, Percent, CreditCard, Lock} from 'lucide-react';

import paintSrc from "../images/paint.png";

interface contentProps{
  price: number;
  discount: number;
  validPromo: string;
}
function HeroContent({price, discount, validPromo}: contentProps) {
    const { isOpen: isRegOpen, onOpen: onRegOpen, onClose: onRegClose } = useDisclosure();
    const { isOpen: isPayOpen, onOpen: onPayOpen, onClose: onPayClose } = useDisclosure();

    const [isRegistred, setReg] = useState(false);

    const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' });
    const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
    
    const [paymentData, setPaymentData] = useState({ promo: '', card: '' });
    const [paymentErrors, setPaymentErrors] = useState({ promo: '', card: '' });
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const handlePaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      if (name === 'card') {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        const formatted = digits.replace(/(\d{4})/g, '$1 ').trim();
        setPaymentData(prev => ({ ...prev, card: formatted }));
      } else {
        setPaymentData(prev => ({ ...prev, [name]: value.toUpperCase() }));
      }
      
      if (paymentErrors[name as keyof typeof paymentErrors]) {
        setPaymentErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const applyPromo = () => {
      if (paymentData.promo.trim() === validPromo) {
        setIsPromoApplied(true);
        setPaymentErrors(prev => ({ ...prev, promo: '' }));
      } else {
        setIsPromoApplied(false);
        setPaymentErrors(prev => ({ ...prev, promo: 'Неверный промокод' }));
      }
    };

    const validatePayment = () => {
      const newErrors: typeof paymentErrors = { promo: '', card: '' };
      const cardDigits = paymentData.card.replace(/\D/g, '');
      
      if (!paymentData.card.trim()) {
        newErrors.card = 'Введите номер карты';
      } else if (cardDigits.length !== 16) {
        newErrors.card = 'Номер карты должен содержать 16 цифр';
      }
      
      setPaymentErrors(newErrors);
      return newErrors.card === '' && newErrors.promo === '';
    };

    const validate = () => {
      const newErrors: typeof errors = { name: '', phone: '', email: '' };

      if (!formData.name.trim()) { 
        newErrors.name = 'Введите ваше имя';
      }

      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (!formData.phone.trim()) {
        newErrors.phone = 'Введите номер телефона';
      } else if (!/^(\+7|8)9\d{9}$/.test(phoneDigits)) {
        newErrors.phone = 'Формат: 8 9XX XXX-XX-XX';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Введите email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Некорректный email';
      }
      setErrors(newErrors);
      return newErrors.name === '' && newErrors.phone === '' && newErrors.email === '';
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onRegClose();
      onPayOpen();
    }
  };

  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePayment()) {
      setReg(true);
      onPayClose();
      setPaymentData({ promo: '', card: '' });
      setPaymentErrors({ promo: '', card: '' });
      setIsPromoApplied(false);
    }
  };
  const handleClick = () => {
    if (!isRegistred) {
      onRegOpen();
    }
  }

  const discountPrice = isPromoApplied ? (price * discount) / 100 : 0;
  const finalPrice = price - discountPrice;

  return (
    <>
    <Box flex={{ base: '1', lg: '1' }} pr={{ lg: 8 }} order={{ base :2, lg: 1}}>
      <Text 
        as="h1" 
        fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }} 
        fontWeight="800" 
        lineHeight="1.1" 
        mb={4}
        color="gray.900"
      >
        Мастер-класс по свисту двумя пальцами
      </Text>
      <Text
        fontSize={{ base: '2xl', md: '3xl' }} 
        fontWeight="700" 
        color="yellow.400" 
        mb={0}
      >
        Пальцы во рту — <br/> шум на всю страну!
      </Text>
      <Image
        src={paintSrc}
        alt="Paint"
        w="90px"
        h="15px"
        fallback={<Box w="90px" h="15px" bg="yellow.400" mb={8}/>}
        mb={8}
        sx={{
          transform: "scaleY(-1)",
        }}
      />
      <Button
        size="lg"
        bgGradient={!isRegistred ? 'linear(to-t, yellow.500, yellow.300)' : 'linear(to-t, green.500, green.300)'}
        color="gray.800"
        fontWeight="bold"
        px={8}
        py={8}
        borderRadius="xl"
        _hover={{bgGradient: !isRegistred ? 'linear(to-t, yellow.300, yellow.100)' :  'linear(to-t, green.300, green.100)'}}
        rightIcon={!isRegistred ? <ArrowRight size={20}/> : <Check size={20}/>} 
        w={{ base: '100%', md:'70%' }}
        mb={4}
        onClick={handleClick}
      >
        {!isRegistred ? "Записаться" : "Вы записаны"}
      </Button>

      <Flex direction="column" gap={3}>
        <Flex align="center" gap={2} color="gray.900" fontSize="md">
          <Calendar size={24} />
          <Text>Офлайн мастер-класс + путь в академию</Text>
        </Flex>
        
        <Badge 
          bg="gray.100" 
          color="gray.600" 
          borderRadius="full" 
          px={3} 
          py={1} 
          w="fit-content"
          fontWeight="medium"
        >
          <Flex align="center" gap={2} fontSize="md">
            <User size={20} />
            14–25 лет
          </Flex>
        </Badge>
      </Flex>
    </Box>
    
    <Modal isOpen={isRegOpen} onClose={onRegClose} isCentered size="md">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" p={6}>
          <ModalHeader fontSize="2xl" fontWeight="bold" color="gray.800">
            Запись на мастер-класс
          </ModalHeader>
          <ModalCloseButton />
          
          <form onSubmit={handleSubmit}>
            <ModalBody display="flex" flexDirection="column" gap={4}>
              
              <FormControl isInvalid={!!errors.name}>
                <FormLabel display="flex" alignItems="center" gap={2} fontWeight="medium">
                  <User size={16} />
                  Ваше имя
                </FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  borderRadius="xl"
                  borderColor={errors["name"] ? 'red.400' : 'gray.200'}
                  _focus={{ borderColor: errors["name"] ? 'red.400' : "orange.300"}}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel display="flex" alignItems="center" gap={2} fontWeight="medium">
                  <Phone size={16} />
                  Телефон
                </FormLabel>
                <Input
                  name="phone"
                  placeholder="8 (999) 000-00-00"
                  onChange={handleChange}
                  value={formData.phone}
                  borderRadius="xl"
                  borderColor={errors["phone"] ? 'red.400' : 'gray.200'}
                  _focus={{ borderColor: errors["phone"] ? 'red.400' : "orange.300"}}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel display="flex" alignItems="center" gap={2} fontWeight="medium">
                  <Mail size={16} />
                  E-mail
                </FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="svistun@mail.ru"
                  borderRadius="xl"
                  borderColor={errors["email"] ? 'red.400' : 'gray.200'}
                  _focus={{ borderColor: errors["email"] ? 'red.400' : "orange.300"}}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl>
                <FormLabel fontWeight="medium">Комментарий</FormLabel>
                <Textarea
                  name="comment" 
                  placeholder="Есть вопросы? Напишите здесь..."
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  borderRadius="xl"
                  borderColor="gray.200"
                  resize="none"
                  _focus={{ borderColor: "orange.300"}}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={onRegClose} borderRadius="xl">
                Отмена
              </Button>
              <Button
                type="submit"
                bg="orange.300"
                color="gray.800"
                fontWeight="bold"
                borderRadius="xl"
                px={6}
                _hover={{ bg: "orange.400" }}
              >
                К оплате
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal isOpen={isPayOpen} onClose={onPayClose} isCentered size="md">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" p={6}>
          <ModalHeader fontSize="2xl" fontWeight="bold" color="gray.800">Оплата</ModalHeader>
          <ModalCloseButton />
          
          <form onSubmit={handlePaymentSubmit}>
            <ModalBody display="flex" flexDirection="column" gap={4}>
              
              <Box bg="gray.50" borderRadius="xl" p={4}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text color="gray.600">Стоимость мастер-класса</Text>
                  <Text fontWeight="bold" fontSize="lg">{price} ₽</Text>
                </Flex>
                
                {isPromoApplied && (
                  <Flex justify="space-between" align="center" mb={2} color="green.600">
                    <Text>Скидка {discount}%</Text>
                    <Text fontWeight="bold">−{Math.round(discountPrice)} ₽</Text>
                  </Flex>
                )}
                
                <Divider my={3} />
                
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" fontSize="xl">Итого</Text>
                  <Text fontWeight="bold" fontSize="2xl" color="purple.600">{Math.round(finalPrice)} ₽</Text>
                </Flex>
              </Box>

              <FormControl isInvalid={!!paymentErrors.promo}>
                <FormLabel display="flex" alignItems="center" gap={2} fontWeight="medium">
                  <Percent size={16} /> Промокод
                </FormLabel>
                <HStack gap={2}>
                  <Input
                    name="promo"
                    value={paymentData.promo}
                    onChange={handlePaymentChange}
                    placeholder="XXXXXXX"
                    borderRadius="xl"
                    isDisabled={isPromoApplied}
                    borderColor={paymentErrors["promo"] ? 'red.400' : 'gray.200'}
                    _focus={{ borderColor: paymentErrors["promo"] ? 'red.400' : "orange.300"}}
                  />
                  <Button 
                    onClick={applyPromo} 
                    isDisabled={isPromoApplied || !paymentData.promo.trim()}
                    bg="purple.500" color="white" borderRadius="xl" _hover={{ bg: "purple.600" }}
                  >
                    {isPromoApplied ? 'Применён' : 'Применить'}
                  </Button>
                </HStack>
                <FormErrorMessage>{paymentErrors.promo}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!paymentErrors.card}>
                <FormLabel display="flex" alignItems="center" gap={2} fontWeight="medium">
                  <CreditCard size={16} /> Номер карты
                </FormLabel>
                <Input
                  name="card"
                  value={paymentData.card}
                  onChange={handlePaymentChange}
                  placeholder="0000 0000 0000 0000"
                  borderRadius="xl"
                  borderColor={paymentErrors["card"] ? 'red.400' : 'gray.200'}
                  _focus={{ borderColor: paymentErrors["card"] ? 'red.400' : "orange.300"}}
                />
                <FormErrorMessage>{paymentErrors.card}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            
            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={onPayClose} borderRadius="xl">Отмена</Button>
              <Button 
                type="submit" 
                bg="green.400" 
                color="white" 
                fontWeight="bold" 
                borderRadius="xl" 
                px={6} 
                _hover={{ bg: "green.500" }}
                rightIcon={<Lock size={16} />}
              >
                Оплатить {Math.round(finalPrice)} ₽
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      </>
  );
};

export default HeroContent;