import { useStorage } from '@/hooks/use-storage'
import { Box, Heading, Spinner, VStack, Tooltip, Icon, Text, IconButton, Button, Badge, useClipboard, useToast } from '@chakra-ui/react'
import { Type, FileText, Copy, Check, Download } from 'react-feather'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useLoading from '@/hooks/use-loading'
import { IPrivateFile, IPublicFile, isPublicFile } from '@/types/storage'
import { useAuth } from '@/hooks/use-auth'

import * as _ from 'underscore'

const ObjectPage: NextPage = () => {
  const {
    query: { path },
  } = useRouter()
  const { getFile, getFileMetadata, listDataAccessors, listAccessNFT } = useStorage()
  const { useSTXAddress, getAccessNFTBalance } = useAuth()

  const [STXAddress] = useState<string | undefined>(useSTXAddress())
  const [metadata, setMetadata] = useState<IPublicFile | undefined>()
  const [text, setText] = useState<string>('')
  const { onCopy: onTextCopy, hasCopied: hasCopiedText } = useClipboard(text)
  const { isLoading: isDownloading, startLoading: startDownloadLoading, stopLoading: stopDownloadLoading } = useLoading()

  const toast = useToast()

  const handleFileDownload = async () => {
    startDownloadLoading()
    if (metadata && STXAddress) {
      const dataAccessors = await listDataAccessors(metadata.url)
      const listAccessorsNFT = await listAccessNFT(metadata.url)
      const accessNFTBalance = await getAccessNFTBalance(STXAddress)
      // If current User does not have Smart Contract Permission -> Toast
      // metadata is of type IPublicFile
      if (!dataAccessors.includes(STXAddress) && metadata.userAddress !== STXAddress && metadata.accessControl === 'shared') {
        toast({
          status: 'error',
          title: 'Missing Permission',
          description: 'You do not have the permission to download this file',
        })
        stopDownloadLoading()
        return null
        //@ts-ignore
      }
      if (
        _.intersection(accessNFTBalance, listAccessorsNFT).length === 0 &&
        metadata.userAddress !== STXAddress &&
        metadata.accessControl === 'shared'
      ) {
        toast({
          status: 'error',
          title: 'Missing Permission',
          description: 'You do not have the permission to download this file',
        })
        stopDownloadLoading()
        return null
        //@ts-ignore
      }

      if (metadata.userAddress !== STXAddress && metadata.accessControl === 'private') {
        toast({
          status: 'error',
          title: 'Missing Permission',
          description: 'You do not have the permission to download this file',
        })
        stopDownloadLoading()
        return null
      }

      const data = await getFile(metadata.url, metadata.encrypted)

      const blob = new Blob([data as ArrayBuffer], {
        type: 'application/octet-stream',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = metadata.path
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    stopDownloadLoading()
  }

  useEffect(() => {
    const fetchFile = async () => {
      if (path) {
        const pathParsed = (path as string).trim()
        const metadata = await getFileMetadata(pathParsed)

        if (metadata) {
          setMetadata(metadata)
        }

        // isPublicFile(metadata) && STXAddress === metadata.userAddress
        // console.log(isPublicFile(metadata))
        // console.log(STXAddress)
        // console.log(metadata.userAddress)

        // Whether the correct data is displayed or not is checked in the use-storage.ts
        if (metadata && metadata.isString) {
          const data = await getFile(metadata.url, metadata.encrypted)
          // console.log(data)
          setText(data as string)
        }
      }
    }

    fetchFile()
  }, [path])

  return (
    <>
      {metadata ? (
        <Box>
          <VStack spacing={4}>
            <Box>
              {metadata.isString ? (
                <Tooltip label="Text">
                  <Icon as={Type} aria-label="Text" h={8} w={8} />
                </Tooltip>
              ) : (
                <Tooltip label="File">
                  <Icon as={FileText} aria-label="File" h={8} w={8} />
                </Tooltip>
              )}
            </Box>
            <Heading as="h2" fontSize="2xl">
              {metadata.path}
            </Heading>
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
              }[metadata.accessControl]
            }
            {useSTXAddress()}
            {isPublicFile(metadata) && STXAddress === metadata.userAddress ? (
              <Badge variant="solid" colorScheme="blue">
                Yours
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="orange">
                Not Yours
              </Badge>
            )}
            {metadata.isString ? (
              text ? (
                <VStack>
                  <Text bg="brand.primary" border="2px" borderColor="black" p={4} rounded="md">
                    {text}
                  </Text>
                  <IconButton
                    icon={hasCopiedText ? <Icon as={Check} /> : <Icon as={Copy} />}
                    aria-label="Copy Text"
                    onClick={onTextCopy}
                    border="2px"
                    borderColor="black"
                    color="black"
                    _hover={{ bg: 'black', color: 'white' }}
                    colorScheme={hasCopiedText ? 'green' : 'gray'}
                  />
                </VStack>
              ) : (
                <Spinner />
              )
            ) : (
              <Button
                onClick={handleFileDownload}
                border="2px"
                borderColor="black"
                color="black"
                _hover={{ bg: 'black', color: 'white' }}
                leftIcon={<Icon as={Download} />}
                isLoading={isDownloading}
              >
                Download
              </Button>
            )}
          </VStack>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default ObjectPage
function toast(arg0: { status: string; title: string; description: string }) {
  throw new Error('Function not implemented.')
}
