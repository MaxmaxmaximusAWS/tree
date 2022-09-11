import { Node, normalizeNodes, updateNodesStatuses } from './helpers'
import React, { useMemo, useState } from 'react'
import type { NodeDto } from '@types'

export interface TreeProps {
  nodes: NodeDto[]
}

export const Tree = ({ nodes: rawNodes }: TreeProps) => {
  // We create optimized node models for convenient work with data
  const nodes = useMemo(() => normalizeNodes(rawNodes), [rawNodes])
  const [activeNode, setActiveNode] = useState<Node>()

  const nodesWithStatuses = useMemo(
    () => updateNodesStatuses(nodes, activeNode),
    [nodes, activeNode]
  )

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
              x1={node.x}
              y1={node.y}
              x2={node.parent.x}
              y2={node.parent.y}
              stroke={node.activeEdge ? 'rgb(0,31,249)' : 'rgb(0,0,0)'}
              strokeWidth="1"
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
          cursor="pointer"
          strokeWidth="0.5"
          stroke="rgb(0,0,0)"
        />
      ))}
    </svg>
  )
}
