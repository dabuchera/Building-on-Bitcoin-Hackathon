import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  Button,
  Flex,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  useDisclosure,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  Box,
  useToast,
  Icon,
  HStack,
  LinkBox,
  LinkOverlay,
  useClipboard,
  Badge,
} from '@chakra-ui/react'
import { MutableRefObject, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { Type, FileText, Share2, Trash2, Copy, Check } from 'react-feather'
import NextLink from 'next/link'
import useLoading from '@/hooks/use-loading'
import { useStorage } from '@/hooks/use-storage'
import { AccessControl } from '@/types/storage'

interface IFileProps {
  path: string
  accessControl: AccessControl
  encrypted: boolean
  isString: boolean
  lastModified: string
  url: string
}

const File = ({ path, accessControl, encrypted, isString, lastModified, url }: IFileProps) => {
  const { toggleshareFile, deleteFile } = useStorage()
  const toast = useToast()

  const { isLoading: isLoading, startLoading: startLoading, stopLoading: stopLoading } = useLoading()

  const { isOpen: isShareAlertDialogOpen, onOpen: onShareAlertDialogOpen, onClose: onShareAlertDialogClose } = useDisclosure()

  const shareDialogCancelRef = useRef<HTMLButtonElement>() as MutableRefObject<HTMLButtonElement>

  useEffect(() => {
    // console.log({ path, accessControl, encrypted, isString, lastModified, url })
  }, [])

  const handleShareFile = async (path: string) => {
    startLoading()
    try {
      await toggleshareFile(path)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error deleting file',
        description: 'Something went wrong. Please try again later',
        status: 'error',
      })
    }
    stopLoading()
    onShareAlertDialogClose()
  }

  const { isOpen: isDeleteAlertDialogOpen, onOpen: onDeleteAlertDialogOpen, onClose: onDeleteAlertDialogClose } = useDisclosure()

  const deleteDialogCancelRef = useRef<HTMLButtonElement>() as MutableRefObject<HTMLButtonElement>

  const { onCopy: onCopyGaiaUrl, hasCopied: hasCopiedGaiaUrl } = useClipboard(url)

  const handleDeleteFile = async (path: string) => {
    startLoading()
    try {
      await deleteFile(path)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error deleting file',
        description: 'Something went wrong. Please try again later',
        status: 'error',
      })
    }
    stopLoading()
    onDeleteAlertDialogClose()
  }

  return (
    <LinkBox
      as={Flex}
      bg="whiteAlpha.200"
      p={4}
      rounded="lg"
      flexDirection="column"
      border="2px"
      borderColor="brand.secondary"
      transition="all 0.2s ease-in-out"
      _hover={{ borderColor: 'white' }}
    >
      <HStack spacing={2} alignItems="center">
        {isString ? (
          <Tooltip label="Text">
            <Icon as={Type} aria-label="Text" h={5} w={5} />
          </Tooltip>
        ) : (
          <Tooltip label="File">
            <Icon as={FileText} aria-label="File" h={5} w={5} />
          </Tooltip>
        )}
        <NextLink href={`/object/${path}`} passHref>
          <LinkOverlay fontWeight="bold" fontSize="lg">
            {path}
          </LinkOverlay>
        </NextLink>
        {
          {
            public: (
              <Badge variant="solid" colorScheme="green">
                Public
              </Badge>
            ),
            private: (
              <Badge variant="solid" colorScheme="red">
                Private
              </Badge>
            ),
            shared: (
              <Badge variant="solid" colorScheme="orange">
                Shared
              </Badge>
            ),
          }[accessControl]
        }
        {/* {isPublic ? (
          shared ? (
            <Badge colorScheme="orange">Shared</Badge>
          ) : (
            <Badge colorScheme="green">Public</Badge>
          )
        ) : (
          <Badge colorScheme="red">Private</Badge>
        )} */}
      </HStack>
      <Box>
        <Tooltip label={format(new Date(lastModified), 'PPPPpppp')}>
          <Text width="fit-content">Last modified: {format(new Date(lastModified), 'PPP')}</Text>
        </Tooltip>
      </Box>

      {/* Copy Gaia URL */}
      <Flex mt={2}>
        <Box mr={2}>
          <Button
            width="140px"
            color="black"
            backgroundColor={hasCopiedGaiaUrl ? 'green.400' : 'cyan.400'}
            leftIcon={hasCopiedGaiaUrl ? <Icon as={Check} /> : <Icon as={Copy} />}
            size="sm"
            onClick={onCopyGaiaUrl}
          >
            Copy Gaia URL
          </Button>
        </Box>

        {/* Delete Button and Modal */}
        <Box>
          <Button leftIcon={<Icon as={Trash2} />} color="black" bg="red.400" size="sm" onClick={onDeleteAlertDialogOpen}>
            Delete
          </Button>
          <AlertDialog isOpen={isDeleteAlertDialogOpen} onClose={onDeleteAlertDialogClose} leastDestructiveRef={deleteDialogCancelRef}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader>Delete File</AlertDialogHeader>
                <AlertDialogBody>Are you sure you want to delete this file? This operation cannot be undone.</AlertDialogBody>
                <AlertDialogFooter as={Flex}>
                  <Button onClick={onDeleteAlertDialogClose} ref={deleteDialogCancelRef}>
                    Cancel
                  </Button>
                  <Button ml={2} color="black" bg="red.400" onClick={async () => await handleDeleteFile(path)} isLoading={isLoading}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Flex>

      {/* Allow / Revoke Sharing */}
      <Flex mt={2}>
        {accessControl === 'public' ? (
          <></>
        ) : (
          <Box mr={2}>
            <Button width="140px" leftIcon={<Icon as={Share2} />} color="black" bg="blue.400" size="sm" onClick={onShareAlertDialogOpen}>
              {accessControl === 'private' ? 'Allow Sharing' : 'Revoke Sharing'}
            </Button>
            <AlertDialog isOpen={isShareAlertDialogOpen} onClose={onShareAlertDialogClose} leastDestructiveRef={shareDialogCancelRef}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader>Share File</AlertDialogHeader>
                  <AlertDialogBody>Are you sure you want to share this file?</AlertDialogBody>
                  <AlertDialogFooter as={Flex}>
                    <Button onClick={onShareAlertDialogClose} ref={shareDialogCancelRef}>
                      Cancel
                    </Button>
                    <Button ml={2} color="black" bg="blue.400" onClick={async () => await handleShareFile(path)} isLoading={isLoading}>
                      {accessControl === 'private' ? 'Allow Sharing' : 'Revoke Sharing'}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        )}
        {/* Sharing Control */}
        {accessControl === 'shared' ? (
          <Box>
            <a href={`/sharingcontrol/${path}`}>
              <Button leftIcon={<Icon as={Share2} />} color="black" bg="blue.100" size="sm">
                Sharing Control
              </Button>
            </a>
          </Box>
        ) : (
          <></>
        )}
      </Flex>
    </LinkBox>
  )
}

export default File
