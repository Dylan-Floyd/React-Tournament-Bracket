import React from 'react'

export default function Match({ players }) {
  const [player1, player2] = players
  return (
    <div className='grid grid-rows-2 grid-cols-6 bg-slate-600 rounded-md text-sm'>
      <div className='col-start-1 col-span-1 row-start-1 row-span-1 bg-slate-400 border-b border-black rounded-tl-md p-2'>{player1?.seed ?? '?'}</div>
      <div className='col-start-2 col-span-full row-start-1 row-span-1 text-white border-b border-black text-left p-2'>{player1?.name ?? '???'}</div>

      <div className='col-start-1 col-span-1 row-start-2 row-span-1 bg-slate-400 rounded-bl-md p-2 min-w-min'>{player2?.seed ?? '?'}</div>
      <div className='col-start-2 col-span-full row-start-2 row-span-1 text-white text-left p-2'>{player2?.name ?? '???'}</div>
    </div>
  )
}
