'use client';

import { Group, rem, ScrollArea } from '@mantine/core';
// import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { Logo } from './Logo';
import classes from './SidebarExpanded.module.css';

export function SidebarExpanded({ toggleSidebar, links, active, setActive }) {
  // const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  const expandedLinks = links.map((item, index) => (
    <LinksGroup
      {...item}
      key={item.label}
      onClick={() => setActive(index)}
      active={index === active}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} onClick={toggleSidebar} />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {expandedLinks}
        </div>
      </ScrollArea>

      {/* <div className={classes.footer}>
        <UserButton />
      </div> */}

    </nav>
  );
}
