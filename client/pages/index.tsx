import React, { useState } from 'react';
import {
  Button,
  Flex,
  Input,
  VStack,
  Text,
  Divider,
  HStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { IoKeyOutline } from 'react-icons/io5';

import { useSockets } from '../providers/SocketProvider';

const variant = {
  active: { opacity: 1, y: 0 },
  inactive: { opacity: 0, y: '-100%' },
};

export default function Home() {
  const router = useRouter();

  const { socket } = useSockets();

  const [name, setName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>(uuid().slice(0, 8));
  const [host, setHost] = useState<boolean>(false);
  const [joinGameTab, setJoinGameTab] = useState<boolean>(false);

  const onClick = () => {
    setHost(true);
    socket.emit(
      'join',
      { name: name, roomId: roomId, host: true },
      (error: any) => {
        console.log(error);
      }
    );

    router.push({ pathname: '/[id]', query: { id: roomId } });
  };

  const joinLobby = () => {
    socket.emit(
      'join',
      { name: name, roomId: roomId, host: false },
      (error: any) => {
        console.log(error);
      }
    );
    router.push({ pathname: '/[id]', query: { id: roomId } });
  };

  return (
    <Flex
      w="full"
      h="100vh"
      background="dark.background"
      justifyContent="center"
      color="white"
    >
      <VStack
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        spacing={4}
      >
        <AnimatePresence>
          {!joinGameTab ? (
            <motion.div
              animate={joinGameTab ? 'inactive' : 'active'}
              variants={variant}
            >
              <VStack
                w="full"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                spacing={4}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineUser />}
                  />
                  <Input
                    w={80}
                    placeholder="Name"
                    borderColor="#575757"
                    _hover={{
                      background: '#18161B',
                    }}
                    _focus={{
                      background: '#251F2D',
                      borderColor: 'dark.primary',
                      borderWidth: '2px',
                    }}
                    _placeholder={{
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <Button
                  fontWeight="normal"
                  background="#BB86FC"
                  _hover={{
                    background: '#BD8AFC',
                  }}
                  _focus={{
                    background: 'C394FC',
                    borderColor: 'white',
                    borderWidth: '2px',
                  }}
                  _active={{
                    background: '#C192FC',
                    borderWidth: '0px',
                  }}
                  onClick={onClick}
                >
                  Create Room
                </Button>
                <HStack
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                  spacing={5}
                  py={6}
                >
                  <Divider orientation="horizontal" w={20} />
                  <Text fontSize="sm">or</Text>
                  <Divider orientation="horizontal" w={20} />
                </HStack>
                <Text fontSize="sm">
                  Want to join an existing game?{' '}
                  <Button
                    variant="unstyled"
                    fontSize="normal"
                    as="span"
                    color="dark.primary"
                    cursor="pointer"
                    onClick={() => setJoinGameTab(true)}
                  >
                    Click here
                  </Button>
                  .
                </Text>
              </VStack>
            </motion.div>
          ) : (
            <motion.div
              animate={joinGameTab ? 'active' : 'inactive'}
              variants={variant}
            >
              <VStack
                w="full"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                spacing={4}
              >
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineUser />}
                  />
                  <Input
                    w={80}
                    placeholder="Name"
                    borderColor="#575757"
                    _hover={{
                      background: '#18161B',
                    }}
                    _focus={{
                      background: '#251F2D',
                      borderColor: 'dark.primary',
                      borderWidth: '2px',
                    }}
                    _placeholder={{
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoKeyOutline />}
                  />
                  <Input
                    w={80}
                    placeholder="Code"
                    borderColor="#575757"
                    _hover={{
                      background: '#18161B',
                    }}
                    _focus={{
                      background: '#251F2D',
                      borderColor: 'dark.primary',
                      borderWidth: '2px',
                    }}
                    _placeholder={{
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                </InputGroup>
                <Button
                  fontWeight="normal"
                  background="#BB86FC"
                  _hover={{
                    background: '#BD8AFC',
                  }}
                  _focus={{
                    background: 'C394FC',
                    borderColor: 'white',
                    borderWidth: '2px',
                  }}
                  _active={{
                    background: '#C192FC',
                    borderWidth: '0px',
                  }}
                  onClick={joinLobby}
                >
                  Join Game
                </Button>
                <HStack
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                  spacing={5}
                  py={6}
                >
                  <Divider orientation="horizontal" w={20} />
                  <Text fontSize="sm">or</Text>
                  <Divider orientation="horizontal" w={20} />
                </HStack>
                <Text fontSize="sm">
                  Want to create a game?{' '}
                  <Button
                    variant="unstyled"
                    fontSize="normal"
                    as="span"
                    color="dark.primary"
                    cursor="pointer"
                    onClick={() => setJoinGameTab(false)}
                  >
                    Click here
                  </Button>
                  .
                </Text>
              </VStack>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>
    </Flex>
  );
}
