import React from 'react'
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
 
export default () => {
//   const { width, height } = useWindowSize()
  return (
//     <Confetti
//   drawShape={ctx => {
//     ctx.beginPath()
//     for(let i = 0; i < 22; i++) {
//       const angle = 0.35 * i
//       const x = (0.2 + (1 * angle))
//       const y = (0.2 + (1 * angle))
//       ctx.lineTo(x, y)
//     }
//     ctx.stroke()
//     ctx.closePath()
//   }}
// />
<Confetti
drawShape={ctx => {
  ctx.beginPath()
  for(let i = 0; i < 22; i++) {
      const angle = 0.5 * i
      const x = (2 + (1 * angle))
      const y = (0.5 + (1 * angle))
    ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.closePath()
}}
/>
  )
}