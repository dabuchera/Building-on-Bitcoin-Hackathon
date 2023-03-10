import { Spinner, Grid, Button, Spacer, Center, Text, Code, Link, Flex, Icon } from '@chakra-ui/react'
import { useEffect } from 'react'
import File from '@/components/File'
import { IPrivateFile, PrivateMetadataFile } from '@/types/storage'
import { useStorage } from '@/hooks/use-storage'
import { RefreshCcw } from 'react-feather'
import NextLink from 'next/link'

const Files = () => {
  const { refreshMetadata, metadata, isMetadataRefreshing } = useStorage()

  useEffect(() => {
    const fetchFiles = async () => {
      await refreshMetadata()
    }

    fetchFiles()
  }, [])

  return (
    <>
      {metadata ? (
        <Button
          onClick={async () => await refreshMetadata()}
          border="2px"
          borderColor="black"
          color="black"
          _hover={{ bg: 'black', color: 'white' }}
          leftIcon={<Icon as={RefreshCcw} />}
          mb={8}
          isLoading={isMetadataRefreshing}
        >
          Refresh
        </Button>
      ) : (
        <Spacer mb={8} h={4} mt={8} />
      )}

      {isMetadataRefreshing ? (
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} w="100%">
          {metadata && Object.keys(metadata.files).length > 0 ? (
            Object.keys(metadata.files).map((path) => {
              // const { isPublic, isString, lastModified, shared, url }: IPrivateFile = metadata?.files[
              const { accessControl, encrypted, isString, lastModified, url }: IPrivateFile = metadata?.files[
                path as keyof PrivateMetadataFile['files']
              ] as IPrivateFile
              return (
                <File
                  key={path}
                  path={path}
                  accessControl={accessControl}
                  encrypted={encrypted}
                  isString={isString}
                  lastModified={lastModified}
                  url={url}
                />
              )
            })
          ) : (
            <Center as={Flex} flexDirection="column">
              <Text fontSize="xl" fontWeight="semibold">
                No files found
              </Text>
              <Text>
                Upload a file by heading over to{' '}
                <NextLink href="/upload" passHref>
                  <Code as={Link} color="black">
                    /upload
                  </Code>
                </NextLink>
              </Text>
            </Center>
          )}
        </Grid>
      )}
    </>
  )
}

export default Files
