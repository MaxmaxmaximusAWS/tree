import { NodeDto } from '@types'

export interface NodeModel {
  id: number
  x: number
  y: number
  parentId: number | null
  parent: NodeModel | null
  childNodes: NodeModel[]
  active: boolean
  activeEdge: boolean
}

interface NodeModelMapById {
  [id: number]: NodeModel
}

export const normalizeNodes = (nodes: NodeDto[]): NodeModel[] => {
  // We use just empty object instead of "new Map" for performance
  const nodeModelsMapById: NodeModelMapById = Object.create(null)
  const normalizedNodes: NodeModel[] = []

  // Create normalized nodes
  for (let node of nodes) {
    const normalizedNode: NodeModel = {
      id: node.id,
      x: node.x,
      y: node.y,
      childNodes: [],
      parent: null,
      active: false,
      activeEdge: false,
      parentId: node.parent_id,
    }
    nodeModelsMapById[normalizedNode.id] = normalizedNode
    normalizedNodes.push(normalizedNode)
  }

  // Connecting children and parents
  for (let id in nodeModelsMapById) {
    const nodeModel = nodeModelsMapById[id]

    if (nodeModel.parentId !== null) {
      const nodeModelParent = nodeModelsMapById[nodeModel.parentId]
      nodeModelParent.childNodes.push(nodeModel)
      nodeModel.parent = nodeModelParent
    }
  }

  return normalizedNodes
}

export const updateNodesStatuses = (
  nodes: NodeModel[],
  nodeToActivate?: NodeModel
) => {
  // Reset all nodes statuses
  for (let node of nodes) {
    node.active = false
    node.activeEdge = false
  }

  if (!nodeToActivate) {
    return nodes
  }

  // Activate this node
  nodeToActivate.active = true

  // Activate edges by parents chain
  let current = nodeToActivate
  while (current) {
    current.activeEdge = true
    current = current.parent!
  }

  // Activate children recursive
  const activateChildren = (node) => {
    for (let child of node.childNodes) {
      child.active = true
      activateChildren(child)
    }
  }

  activateChildren(nodeToActivate)

  return nodes
}
