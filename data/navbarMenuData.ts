export interface NavbarMenuItem {
  label: string
  path?: string
  children?: NavbarMenuItem[]
}

export interface PageNavbarMenu {
  [key: string]: NavbarMenuItem[]
}

export const navbarMenus: PageNavbarMenu = {
  '/dashboard': [
    { label: 'Activity' },
    { 
      label: 'Laporan',
      children: [
        { label: 'Laporan Harian', path: '/laporan/harian' },
        { label: 'Laporan Bulanan', path: '/laporan/bulanan' },
      ]
    },
    { 
      label: 'Pengaturan',
      children: [
        { label: 'Profil', path: '/pengaturan/profil' },
        { label: 'Keamanan', path: '/pengaturan/keamanan' },
      ]
    },
  ],
  '/pengelolaan-organisasi': [
    { 
      label: 'Activity',
      children: [
        { label: 'Struktur Organisasi', path: '/pengelolaan-organisasi/struktur' },
        { label: 'Job Katalog', path: '/pengelolaan-organisasi/job-katalog' },
        { label: 'Jabatan Kosong', path: '/pengelolaan-organisasi/jabatan-kosong' },
      ]
    },
    { 
      label: 'Laporan',
      children: [
        { label: 'RACI', path: '/pengelolaan-organisasi/raci' },
        { label: 'Formasi SDM', path: '/pengelolaan-organisasi/formasi-sdm' },
        { label: 'Evaluasi Organisasi', path: '/pengelolaan-organisasi/evaluasi' },
        { label: 'Report Evaluasi', path: '/pengelolaan-organisasi/report-evaluasi' },
      ]
    },
    { 
      label: 'Pengaturan',
      children: [
        { label: 'Organisasi Unit', path: '/pengelolaan-organisasi/organisasi-unit' },
        { label: 'Area', path: '/pengelolaan-organisasi/area' },
        { label: 'Sub Area', path: '/pengelolaan-organisasi/sub-area' },
        { label: 'Job', path: '/pengelolaan-organisasi/job' },
      ]
    },
  ],
  '/administrasi-personal': [
    { label: 'Data Personal' },
    { 
      label: 'Dokumen',
      children: [
        { label: 'KTP', path: '/administrasi-personal/ktp' },
        { label: 'NPWP', path: '/administrasi-personal/npwp' },
      ]
    },
  ],
  '/layanan-mandiri': [
    { label: 'Beranda' },
    { 
      label: 'Permohonan',
      children: [
        { label: 'Cuti', path: '/layanan-mandiri/cuti' },
        { label: 'Izin', path: '/layanan-mandiri/izin' },
      ]
    },
  ],
  '/kehadiran': [
    { label: 'Absensi Hari Ini' },
    { 
      label: 'Riwayat',
      children: [
        { label: 'Riwayat Absensi', path: '/kehadiran/riwayat' },
        { label: 'Rekap Bulanan', path: '/kehadiran/rekap' },
      ]
    },
  ],
  '/penggajian': [
    { label: 'Slip Gaji' },
    { 
      label: 'Riwayat',
      children: [
        { label: 'Riwayat Gaji', path: '/penggajian/riwayat' },
        { label: 'Tunjangan', path: '/penggajian/tunjangan' },
      ]
    },
  ],
  '/perjalanan-dinas': [
    { label: 'Daftar Perjalanan' },
    { 
      label: 'Pengajuan',
      children: [
        { label: 'Buat Pengajuan', path: '/perjalanan-dinas/buat' },
        { label: 'Status Pengajuan', path: '/perjalanan-dinas/status' },
      ]
    },
  ],
  '/help-desk': [
    { label: 'Tiket Saya' },
    { 
      label: 'Bantuan',
      children: [
        { label: 'Buat Tiket', path: '/help-desk/buat' },
        { label: 'FAQ', path: '/help-desk/faq' },
      ]
    },
  ],
  '/dashboard-analytics': [
    { label: 'Overview' },
    { 
      label: 'Analitik',
      children: [
        { label: 'Statistik', path: '/dashboard-analytics/statistik' },
        { label: 'Grafik', path: '/dashboard-analytics/grafik' },
      ]
    },
  ],
  '/pendidikan-pelatihan': [
    { label: 'Daftar Pelatihan' },
    { 
      label: 'Riwayat',
      children: [
        { label: 'Pelatihan Saya', path: '/pendidikan-pelatihan/riwayat' },
        { label: 'Sertifikat', path: '/pendidikan-pelatihan/sertifikat' },
      ]
    },
  ],
  '/informasi-komunikasi': [
    { label: 'Pengumuman' },
    { 
      label: 'Komunikasi',
      children: [
        { label: 'Broadcast', path: '/informasi-komunikasi/broadcast' },
        { label: 'Newsletter', path: '/informasi-komunikasi/newsletter' },
      ]
    },
  ],
  '/korespondensi-kearsipan': [
    { label: 'Surat Masuk' },
    { 
      label: 'Arsip',
      children: [
        { label: 'Surat Keluar', path: '/korespondensi-kearsipan/keluar' },
        { label: 'Dokumen', path: '/korespondensi-kearsipan/dokumen' },
      ]
    },
  ],
}
