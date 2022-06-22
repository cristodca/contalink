import React from 'react'

export default function InvoiceCard({ total, status, date, number }) {
  const newDate = new Date(date)
  const stringDate = newDate.toLocaleString()

  return (
    <div className={`bg-white p-4 rounded-2xl ${status === 'Cancelado' && ' bg-red-50 border border-red-200'}`}>
      <div className='flex items-center justify-between mb-4 gap-2'>
        <span className='text-contalink-400 font-medium'>{number ? number : '---'}</span>
        <span className='text-contalink-300'>{stringDate ? stringDate : '---'}</span>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <span className='text-contalink-500 font-bold text-3xl'>$ {total ? total : '---'}</span>
        <span className={`text-lg ${status === 'Cancelado' ? 'text-red-500' : 'text-green-500'}`}>{status}</span>
      </div>
    </div>
  )
}
