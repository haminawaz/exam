import React from 'react'
import { WhyChoose } from './WhyChoose'
import { Promotional } from './Promotional'
import { ExploreExciting } from './ExploreExciting'
import { FrequentlyQuestions } from './FrequentlyQuestions' 
import { PercentofParent } from './PercentofParent'
import { Getintouch } from './Getintouch'

export default function Home () {
  return (
    <div>
      <WhyChoose />
      <Promotional />
      <ExploreExciting />
      <FrequentlyQuestions  />
      <PercentofParent />
      <Getintouch />
    </div>
  )
}
