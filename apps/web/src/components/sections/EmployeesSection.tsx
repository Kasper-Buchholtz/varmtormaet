import React from 'react'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import EmployeeCard from '@/components/molecules/EmployeeCard'
import { clean } from '@/utils/sanitize'
import { EmployeesType } from 'sanity.types'

type EmployeesSectionProps = {
  data: EmployeesType
}
const EmployeesSection = ({ data }: EmployeesSectionProps) => {
  return (
    <Section data={data}>
      <div className="col-span-full">
        <Heading data={data.heading}>{data.heading.text}</Heading>
      </div>
      <Section
        paddingBottom="none"
        paddingTop="none"
        paddingX="none"
        tag="ul"
        className="bg-transparent col-span-full"
      >
        <EmployeesSection.Department section={data} />
        <EmployeesSection.All section={data} />
        <EmployeesSection.Manual section={data} />
      </Section>
    </Section>
  )
}

export default EmployeesSection
EmployeesSection.Department = Department
EmployeesSection.All = All
EmployeesSection.Manual = Manual

function Department({ section }: { section }) {
  return (
    <>
      {clean(section.view) === 'department' && (
        <>
          {section.department.map((department, index) => (
            <Section
              paddingX="none"
              paddingBottom="none"
              paddingTop="none"
              tag={'div'}
              key={index}
              className="col-span-full"
            >
              {department?.employees?.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} />
              ))}
            </Section>
          ))}
        </>
      )}
    </>
  )
}
function Manual({ section }) {
  return (
    <>
      {clean(section.view) === 'manual' && (
        <>
          {section?.employees?.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
function All({ section }) {
  return (
    <>
      {clean(section.view) === 'all' && (
        <>
          {section?.employees?.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </>
      )}
    </>
  )
}
