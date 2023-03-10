import { useAuth } from '@/hooks/use-auth'
import { Box, Flex, IconButton, Button, Stack, Collapse, Link, useDisclosure, Icon } from '@chakra-ui/react'
import { Home, Play, Menu, Upload, X, Info, UserCheck } from 'react-feather'
import NextLink from 'next/link'
import { LogIn, LogOut } from 'react-feather'
import Logo from '@/components/Logo'
import truncateMiddle from '@/lib/truncate'

interface NavItem {
  label: string
  href?: string
  icon: any
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Playground',
  //   href: '/playground',
  //   icon: Play,
  // },
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Upload',
    href: '/upload',
    icon: Upload,
  },
  {
    label: 'Available Files',
    href: '/overview',
    icon: Info,
  },
]

const Header = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { authenticate, logout, userData, useSTXAddress } = useAuth()

  return (
    <Box>
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
        borderBottom="1px"
        borderColor="brand.secondary"
        justifyContent={'space-between'}
      >
        <IconButton
          onClick={onToggle}
          color="black"
          icon={isOpen ? <Icon as={X} w={5} h={5} /> : <Icon as={Menu} w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
          display={{ md: 'none' }}
        />
        <NextLink href="/" passHref>
          <Link
            fontFamily={'heading'}
            color="black"
            fontSize="2xl"
            fontWeight="bold"
            _hover={{
              opacity: 0.5,
            }}
          >
            {isOpen}
            <Logo height={48} width={48} />
          </Link>
        </NextLink>

        <DesktopNav />
        <>
          {userData ? (
            <Flex>
              <Button mr={5} border="2px"
                borderColor="black">{truncateMiddle(useSTXAddress())}</Button>
              <Button
                onClick={logout}
                border="2px"
                borderColor="black"
                color="black"
                _hover={{ bg: 'black', color: 'white' }}
                leftIcon={<Icon as={LogOut} />}
              >
                Disconnect Wallet
              </Button>
            </Flex>
          ) : (
            <Button
              onClick={authenticate}
              border="2px"
              borderColor="black"
              color="black"
              _hover={{ bg: 'black', color: 'white' }}
              leftIcon={<Icon as={LogIn} />}
            >
              Connect Wallet
            </Button>
          )}
        </>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4} display={{ base: 'none', md: 'flex' }} mr={-24}>
      {NAV_ITEMS.map((navItem) => (
        <NextLink key={navItem.label} href={navItem.href ?? '#'} passHref>
          <Link as={Button} leftIcon={<Icon as={navItem.icon} />} fontWeight="semibold" color="black" _hover={{ bg: 'black', color: 'white' }}>
            {navItem.label}
          </Link>
        </NextLink>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: 'none' }} borderBottom="2px solid #000000">
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <NextLink href={href ?? '#'} passHref>
      <Link py={2} px={2} href={href ?? '#'} fontWeight="semibold" color="black" _hover={{ bg: 'black', color: 'white' }}>
        {label}
      </Link>
    </NextLink>
  )
}

export default Header
