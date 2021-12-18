import React from 'react'

/*
 * Renders something that looks like this:
 *  -----|
 *       |
 *       |-----
 *       |
 *  -----|
 */
export default function SquareFork() {
  return (
    <div className='grid grid-cols-2 grid-rows-2 h-full'>
      {/* Left two horizontal lines And vertical line */}
      <div className='border-white border-t border-b border-r col-start-1 col-span-1 row-start-1 row-span-2' />
      {/* Right horizontal line */}
      <div className='border-white border-b col-start-2 col-span-1 row-start-1 row-span-1' />
    </div>
  )
}
