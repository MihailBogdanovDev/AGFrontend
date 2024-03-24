'use client';

import React, { useState } from 'react';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
    IconUpload
  } from '@tabler/icons-react';
import { SidebarCollapsed } from './SidebarCollapsed';
import { SidebarExpanded } from './SidebarExpanded';

const mockdata = [
    { icon: IconHome2, label: 'Dashboard', link: '/' },
    { icon: IconUpload, label: 'Upload', link: '/test' },
    { icon: IconGauge, label: 'Prepare' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Insights' },
    { icon: IconUser, label: 'Account' },
    { icon: IconSettings, label: 'Settings' },
  ];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1); //Collapsed sidebar is active

  return (
    <div>
      {isOpen ? 
        <SidebarExpanded toggleSidebar={() => setIsOpen(!isOpen)} links={mockdata} active={active} setActive={setActive} /> : 
        <SidebarCollapsed toggleSidebar={() => setIsOpen(!isOpen)} links={mockdata} active={active} setActive={setActive} />
        }
    </div>
  );
}
