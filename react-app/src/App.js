import React from 'react'
import { Stage } from '@inlet/react-pixi'
import Rectangle from './components/Rectangle'
const app = () => (
  <Stage>
    <Rectangle x={100}
      y={100}
      width={500}
      height={300}
      fill={0xff0000} />
  </Stage>
)
export default app;