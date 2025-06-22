import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { getAllCompanions } from '@/lib/actions/companions.actions';
import { getSubjectColor } from '@/lib/utils';
import React from 'react'

const CompanionsLibrary = async ({searchParams}:SearchParams) => {
  const params = await searchParams;
  const subject = params?.subject || '';
  const topic = params?.topic || '';
  const companions = await getAllCompanions({subject,topic,limit:12})
  return (
    <main>
      <section className='flex justify-center gap-4 max-sm:flex-col'>
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className='companions-grid'>
        {
          companions.map((companion) => {
            return (
              <CompanionCard 
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
          )})
        }
      </section>
    </main>
  )
}

export default CompanionsLibrary