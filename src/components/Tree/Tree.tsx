import { Node, normalizeNodes, updateNodesStatuses } from './helpers'
import React, { useMemo, useState } from 'react'
import type { NodeDto } from '@types'

export interface TreeProps {
  nodes: NodeDto[]
}

export const Tree = ({ nodes: rawNodes }: TreeProps) => {
  // We create optimized node models for convenient work with data
  const normalizedNodes = useMemo(() => normalizeNodes(rawNodes), [rawNodes])
  const [activeNode, setActiveNode] = useState<Node>()

  // We should update node statuses when activeNode changes
  const nodes = useMemo(
    () => updateNodesStatuses(normalizedNodes, activeNode),
    [normalizedNodes, activeNode]
  )

  return (
    <svg width={400} height={400} viewBox={'50 -40 100 100'}>
      {/* Edges */}
      {nodes.map(
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
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          fill={node.active ? 'rgb(229,29,29)' : 'rgb(234,234,234)'}
          onClick={() => setActiveNode(node)}
          stroke="rgb(0,0,0)"
          strokeWidth="0.5"
          cursor="pointer"
          r="3.5"
        />
      ))}
    </svg>
  )
}
