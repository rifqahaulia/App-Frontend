import type { MenuItem } from '~/types/menu'

export const sidebarMenuItems: MenuItem[] = [
  { 
    icon: 'lucide:home', 
    image: '/icons/home.png',
    label: 'Home', 
    path: '/dashboard' 
  },
  { 
    icon: 'lucide:user-circle', 
    image: '/icons/administrasi-personal.png',
    label: 'Administrasi Personal', 
    path: '/administrasi-personal' 
  },
  { 
    icon: 'lucide:hand-helping', 
    image: '/icons/layanan-mandiri.png',
    label: 'Layanan Mandiri', 
    path: '/layanan-mandiri' 
  },
  { 
    icon: 'lucide:calendar-check', 
    image: '/icons/kehadiran.png',
    label: 'Kehadiran', 
    path: '/kehadiran' 
  },
  { 
    icon: 'lucide:wallet', 
    image: '/icons/penggajian.png',
    label: 'Penggajian', 
    path: '/penggajian' 
  },
  { 
    icon: 'lucide:plane', 
    image: '/icons/perjalanan-dinas.png',
    label: 'Perjalanan Dinas', 
    path: '/perjalanan-dinas' 
  },
  { 
    icon: 'lucide:headphones', 
    image: '/icons/help-desk.png',
    label: 'Help Desk', 
    path: '/help-desk' 
  },
  { 
    icon: 'lucide:layout-dashboard', 
    image: '/icons/dashboard.png',
    label: 'Dashboard', 
    path: '/dashboard-analytics' 
  },
  { 
    icon: 'lucide:graduation-cap', 
    image: '/icons/pendidikan.png',
    label: 'Pendidikan dan Pelatihan', 
    path: '/pendidikan-pelatihan' 
  },
  { 
    icon: 'lucide:users-round', 
    image: '/icons/pengelolaan-organisasi.png',
    label: 'Pengelolaan Organisasi', 
    path: '/pengelolaan-organisasi' 
  },
  { 
    icon: 'lucide:megaphone', 
    image: '/icons/informasi-komunikasi.png',
    label: 'Informasi dan Komunikasi', 
    path: '/informasi-komunikasi' 
  },
  { 
    icon: 'lucide:file-text', 
    image: '/icons/korespondensi.png',
    label: 'Korespondensi dan Kearsipan', 
    path: '/korespondensi-kearsipan' 
  },
]
