import { NodeModel, normalizeNodes, updateNodesStatuses } from './helpers'
import React, { useMemo, useState } from 'react'
import type { NodeDto } from '@types'

export interface TreeProps {
  nodes: NodeDto[]
}

export const Tree = ({ nodes: rawNodes }: TreeProps) => {
  // We create optimized node models for convenient work with data
  const nodes = useMemo(() => normalizeNodes(rawNodes), [rawNodes])
  const [activeNode, setActiveNode] = useState<NodeModel>()

  const nodesWithStatuses = useMemo<NodeModel[]>(() => {
    return [...updateNodesStatuses(nodes, activeNode)]
  }, [nodes, activeNode])

  const onNodeClick = (node) => {
    setActiveNode(node)
  }

  return (
    <svg width={400} height={400} viewBox={'50 -40 100 100'}>
      {/* Edges */}
      {nodesWithStatuses.map(
        (node) =>
          node.parent && (
            <line
              key={node.id}
              x1={node.parent.x}
              y1={node.parent.y}
              x2={node.x}
              y2={node.y}
              strokeWidth="1"
              stroke={node.activeEdge ? 'rgb(0,31,249)' : 'rgb(0,0,0)'}
            />
          )
      )}

      {/* Nodes */}
      {nodesWithStatuses.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          fill={node.active ? 'rgb(229,29,29)' : 'rgb(234,234,234)'}
          onClick={() => onNodeClick(node)}
          r="3.5"
          strokeWidth="0.5"
          stroke="rgb(0,0,0)"
          cursor={'pointer'}
        />
      ))}
    </svg>
  )
}
