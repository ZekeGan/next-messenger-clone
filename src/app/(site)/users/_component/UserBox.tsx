'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import axios from 'axios'
import Avatar from '@/app/_component/Avatar'
import LoadingModal from '@/app/_component/LoadingModal'

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)
    axios
      .post('/api/conversation', {
        userId: data.id,
      })
      .then((res) => {
        router.push(`conversation/${res.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [data, router])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className=' 
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-white 
        p-3 
        hover:bg-neutral-100 
        rounded-lg 
        transition 
        cursor-pointer
    '
      >
        <Avatar user={data} />
        <div className=' min-w-0 flex-1 '>
          <div className=' focus:outline-none'>
            <div className=' flex justify-between items-center mb-1'>
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
