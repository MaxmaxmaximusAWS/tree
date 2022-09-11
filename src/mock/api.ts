import { NodeDto } from '@/types'

export const NODES_FROM_API: NodeDto[] = [
  { id: 1, x: 100, y: 0, parent_id: null },
  { id: 2, x: 80, y: 10, parent_id: 1 },
  { id: 3, x: 120, y: 10, parent_id: 1 },
  { id: 4, x: 70, y: 20, parent_id: 2 },
  { id: 5, x: 90, y: 20, parent_id: 2 },
  { id: 6, x: 130, y: 20, parent_id: 3 },
]
