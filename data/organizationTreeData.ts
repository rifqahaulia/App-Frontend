export interface TreeNodeData {
  id: string
  label: string
  children?: TreeNodeData[]
}

export const organizationTreeData: TreeNodeData[] = [
  {
    id: '1',
    label: 'PERUM LPPNPI --',
    children: [
      {
        id: '1-1',
        label: 'DIREKTORAT UTAMA - 00',
      },
      {
        id: '1-2',
        label: 'DIREKTORAT KESELAMATAN, KEAMANAN',
      },
      {
        id: '1-3',
        label: 'DIREKTORAT TEKNIK - 00',
      },
      {
        id: '1-4',
        label: 'DIREKTORAT KEUANGAN MANAJEMEN RISIKO - 00',
        children: [
          {
            id: '1-4-1',
            label: 'DIVISI AKUNTANSI DAN ASET - 00',
          },
          {
            id: '1-4-2',
            label: 'DIVISI TRANSAKSI KEUANGAN - 00',
          },
          {
            id: '1-4-3',
            label: 'DIVISI TEKNOLOGI INFORMASI - 00',
          },
        ],
      },
    ],
  },
]
