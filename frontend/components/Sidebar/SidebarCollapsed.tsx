'use client';

import Link from 'next/link';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
} from '@tabler/icons-react';
import classes from './SidebarCollapsed.module.css';
import { LogoCollapsed } from './LogoCollapsed';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function SidebarCollapsed({ toggleSidebar, links, active, setActive }) {
    const collapsedLinks = links.map((link, index) => (
      <Link href={link.link || '#'} key={link.label}>
          <NavbarLink
            {...link}
            active={index === active}
            onClick={() => setActive(index)}
          />
      </Link>
  ));

  return (
    <nav className={classes.navbar}>
        <div className={classes.header}>
            <Center>
                <LogoCollapsed style={{ width: rem(30) }} onClick={toggleSidebar} />
            </Center>
        </div>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {collapsedLinks}
        </Stack>
      </div>

      {/* <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack> */}
    </nav>
  );
}
