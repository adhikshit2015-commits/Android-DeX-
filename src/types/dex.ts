export type NavigationTab = 'dex-workstation' | 'app-drawer' | 'dex-labs-settings' | 'display-multitasking';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  subPath?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  opacity?: number;
  isPinned?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'folder' | 'sheet' | 'pdf' | 'script' | 'document';
  size: string;
  date: string;
  icon: string;
  color: string;
  bg: string;
  content?: string;
  previewUrl?: string;
}

export interface CheckItem {
  id: string;
  label: string;
  status: 'STABLE' | 'ACTIVE' | 'TESTING';
  checked: boolean;
}

export interface AppShortcut {
  id: string;
  name: string;
  icon: string;
  iconGradient: string;
  iconColor?: string;
  category: 'samsung' | 'productivity' | 'media' | 'system';
  description?: string;
}
