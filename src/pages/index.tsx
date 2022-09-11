import { Tree } from '@/components'
import { NODES_FROM_API } from '@/mock'

export default function HomePage() {
  return (
    <>
      <h1>Tree</h1>
      <Tree nodes={NODES_FROM_API} />
    </>
  )
}
