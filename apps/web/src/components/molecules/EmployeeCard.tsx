import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Icon from '@repo/sanity-web/src/components/Icons'
import Photo from '../atoms/Photo'
import Card from '../atoms/Card'
import Paragraph from '../atoms/Paragraph'

/**
 *
 * @returns: En employee card, der viser information om en medarbejder.
 * @example: <EmployeeCard />
 * @alias: EmployeeCard
 * @summary: Denne komponent bruges til at vise information om en medarbejder.
 * @version: 1.0.0
 * @property: [employee]
 * @author: Kasper Buchholtz
 *
 **/

const EmployeeCard = ({ employee }) => {
  return (
    <Card column="quarter">
      <EmployeeCard.Portrait employee={employee} />
      <EmployeeCard.Info employee={employee} />
    </Card>
  )
}
export default EmployeeCard

EmployeeCard.Portrait = Portrait
EmployeeCard.Info = Info

function Portrait({ employee }) {
  return (
    <div className="relative object-cover w-full overflow-hidden rounded-md">
      {employee?.image ? <Photo image={employee.image} aspectRatio="3/4" /> : null}
    </div>
  )
}
function Info({ employee }) {
  const { title, position, phone, email } = employee;
  return (
    <div className="mt-4">
      {position ? (
        <Heading spacing="none" size="sm" tag="h5">
          {title}
        </Heading>
      ) : null}
      <div className="mt-1.5">
        {position ? (
          <Paragraph>
            {position}
          </Paragraph>
        ) : null}
      </div>
      <div className="mt-6 space-y-2">
        {phone ? (
          <Link className="flex gap-3 text-regular" href={`tel:${phone}`}>
            <Icon className="size-6 fill-superego-green" type={'Phone'} />
            {phone}
          </Link>
        ) : null}
        {email ? (
          <Link className="flex gap-3 text-regular" href={`mailto:${email}`}>
            <Icon className="size-6 fill-superego-green" type={'Envelope'} />
            {email}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
