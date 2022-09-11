import { NodeDto } from '@types'

export interface Node {
  id: number
  x: number
  y: number
  parentId: number | null
  parent: Node | null
  children: Node[]
  active: boolean
  activeEdge: boolean
}

interface NodesById {
  [id: number]: Node
}

export const normalizeNodes = (rawNodes: NodeDto[]): Node[] => {
  // We use just empty object instead of "new Map" for performance
  const nodesById: NodesById = Object.create(null)
  const nodes: Node[] = []

  // Create normalized nodes
  for (let rawNode of rawNodes) {
    const node: Node = {
      id: rawNode.id,
      x: rawNode.x,
      y: rawNode.y,
      children: [],
      parent: null,
      active: false,
      activeEdge: false,
      parentId: rawNode.parent_id,
    }
    nodesById[node.id] = node
    nodes.push(node)
  }

  // Add children to parents
  for (let node of nodes) {
    if (node.parentId === null) continue
    const parent = nodesById[node.parentId]
    parent.children.push(node)
    node.parent = parent
  }

  return nodes
}

export const updateNodesStatuses = (
  nodes: Node[],
  activeNode?: Node
): Node[] => {
  // Reset all node statuses
  for (let node of nodes) {
    node.active = false
    node.activeEdge = false
  }

  if (!activeNode) return [...nodes]

  // Activate edges by parents chain
  let current = activeNode
  while (current) {
    current.activeEdge = true
    current = current.parent!
  }

  // Activate node with children recursive
  const activateWithChildren = (node: Node) => {
    node.active = true
    for (let child of node.children) {
      activateWithChildren(child)
    }
  }

  activateWithChildren(activeNode)

  return [...nodes]
}
