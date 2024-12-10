export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  section: 'main' | 'system' | 'profile' | 'footer';
}
