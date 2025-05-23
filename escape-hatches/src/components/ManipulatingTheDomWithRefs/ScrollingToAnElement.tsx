import { useRef } from 'react'
import { Button } from '@/components/common'

export default function CatFriends() {
  const firstCatRef = useRef<HTMLImageElement | null>(null)
  const secondCatRef = useRef<HTMLImageElement | null>(null)
  const thirdCatRef = useRef<HTMLImageElement | null>(null)

  function handleScrollToFirstCat() {
    firstCatRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  function handleScrollToSecondCat() {
    secondCatRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <>
      <nav>
        <Button onClick={handleScrollToFirstCat}>Neo</Button>
        <Button onClick={handleScrollToSecondCat}>Millie</Button>
        <Button onClick={handleScrollToThirdCat}>Bella</Button>
      </nav>
      <div>
        <ul className='w-[500px] h-[200px] bg-violet-100 overflow-x-auto overflow-y-hidden flex gap-5 p-4'>
          <li className='flex-shrink-0'>
            <img
              className='h-[200px] w-auto object-cover'
              src='https://placecats.com/neo/300/200'
              alt='Neo'
              ref={firstCatRef}
            />
          </li>
          <li className='flex-shrink-0'>
            <img
              className='h-[200px] w-auto object-cover'
              src='https://placecats.com/millie/200/200'
              alt='Millie'
              ref={secondCatRef}
            />
          </li>
          <li className='flex-shrink-0'>
            <img
              className='h-[200px] w-auto object-cover'
              src='https://placecats.com/bella/199/200'
              alt='Bella'
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  )
}
