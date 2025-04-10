import { getTechLogos } from '@/lib/utils'
import Image from 'next/image';
import React from 'react'

const TechIcons = async ({ techStack }: TechIconProps ) => {
  const techIcons = await getTechLogos(techStack);
  const selectedTechIcons = techIcons.slice(0, 3);
  const techIconBubbles = selectedTechIcons.map(({ tech, url }, index ) => (
    <div key={ tech } className='relative group bg-dark-300 rounded-full p-2 flex-center'>
      <span className='tech-tooltip'>{ tech }</span>
      <Image src={ url } alt={ tech } width={100} height={100} className='size-5' />
    </div>
  ));
  
  return (
    <div className='flex flex-row'>{techIconBubbles}</div>
  )
}

export default TechIcons