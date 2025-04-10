import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import TechIcons from './TechIcons';

const InterviewCard = ({ interviewId, userId, role, type, techStack, createdAt }: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-100'>
      <div className='card-interview'>
        
        <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
          <p className='badge-text'>{normalizedType}</p>
        </div>

        <Image
          width={90} 
          height={90}
          alt='cover-image'
          src={getRandomInterviewCover()}
          className='rounded-full object-fit size-[75px]'
        />
        <h3 className='capitalize'>{role} Interview</h3>
        
        <div className='flex flex-row gap-10'>
          <div className='flex flex-row gap-2 items-center'>
            <Image width={20} height={20} alt='calender' src="/calendar.svg" />
            <p>{formattedDate}</p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Image alt='star' width={20} height={20} src='/star.svg' />
            <p>{ feedback?.totalScore || '--- / 100' }</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <p className='line-clamp-2'>
            { feedback?.finalAssessment || 'You havent taken the interview yet.'}
          </p>
        </div>

        <div className='flex flex-row justify-between'>
          <TechIcons techStack={techStack} />
          <Button className='btn-primary'>
            <Link href={ feedback
              ? `/interview/${interviewId}/feedback`
              : `/interview/${interviewId}` }
            >
              { feedback ? 'Check Feedback' : 'View Interview' }
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard