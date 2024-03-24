'use client';

import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Modal,
    Progress,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
  } from '@tabler/icons-react';
  import { Logo } from '../Sidebar/Logo';
  import classes from './Navbar.module.css';
import { DropzoneButton } from '../DropZone/DropZoneButton';
  
  const mockdata = [
    {
      icon: IconCode,
      title: 'Open source',
      description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
      icon: IconCoin,
      title: 'Free for everyone',
      description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
      icon: IconBook,
      title: 'Documentation',
      description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
      icon: IconFingerprint,
      title: 'Security',
      description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
      icon: IconChartPie3,
      title: 'Analytics',
      description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
      icon: IconNotification,
      title: 'Notifications',
      description: 'Combusken battles with the intensely hot flames it spews',
    },
  ];

  export function Navbar({ style }: { style?: React.CSSProperties }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
    return (
      <Box pb={50} style={style}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            {/* <Logo size={30}/> */}

            <Group visibleFrom="sm">
              {/* <Button variant="outline" color="#1D72FE">Lorem Ipsum</Button> */}
              {/* <Button variant="gradient" gradient={{ from: 'blue', to: 'violet', deg: 205 }} onClick={open}>Upload Dataset</Button> */}
              <Button variant="filled" onClick={open}>Upload Dataset</Button>

            </Group>

            <Modal opened={opened} onClose={close} size="md" title="" centered radius="lg">
                {/* Modal content */}
                <DropzoneButton />
            </Modal>
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Lorem Ipsum</Button>
              <Button>Upload Dataset</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }
