import React, { useRef, useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  VStack,
  Input,
  useClipboard,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  FormControl,
  IconButton,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

import { socket, useSockets } from '../../providers/SocketProvider';

type MessageProps = {
  text: string;
  user: {
    name: string;
  };
};

export default function Lobby() {
  const { roomId, messages, name } = useSockets();
  const { hasCopied, onCopy } = useClipboard(roomId);
  const [message, setMessage] = useState<string>();
  const messageEndRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        <Heading size="md">Currently waiting for other players</Heading>
        <InputGroup w={80}>
          <Input
            value={roomId}
            borderColor="#575757"
            _hover={{
              background: '#18161B',
            }}
            _focus={{
              background: '#251F2D',
              borderColor: 'dark.primary',
              borderWidth: '2px',
            }}
            isReadOnly
          />
          <InputRightElement
            children={
              <Button
                px={8}
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
                onClick={onCopy}
              >
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            }
          />
        </InputGroup>
        <VStack h="40%" overflowY="auto" w={80} spacing={4} padding={4}>
          {messages.map((message: MessageProps, index: number) =>
            message.user.name === name ? (
              <HStack w="full" justifyContent="flex-end" key={index}>
                <Flex rounded="lg" p={2} background="dark.primary">
                  <Text wordBreak="break-word">{message.text}</Text>
                </Flex>
                <Avatar name={message.user.name} size="sm" />
              </HStack>
            ) : (
              <HStack w="full" justifyContent="flex-start" key={index}>
                <Avatar name={message.user.name} size="sm" />
                <Flex rounded="lg" p={2} background="dark.primary">
                  <Text wordBreak="break-word">{message.text} </Text>
                </Flex>
              </HStack>
            )
          )}
          <div ref={messageEndRef} />
        </VStack>

        <FormControl w={80}>
          <HStack>
            <Input
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === 'Enter' && sendMessage(event)
              }
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
            />
            <IconButton
              onClick={(e) => sendMessage(e)}
              type="submit"
              aria-label="send-button"
              background="transparent"
              _hover={{
                background: 'transparent',
                color: 'dark.primary',
              }}
              _focus={{
                background: 'transparent',
              }}
              _active={{
                background: 'transparent',
              }}
              icon={<IoSend />}
            />
          </HStack>
        </FormControl>
      </VStack>
    </Flex>
  );
}
