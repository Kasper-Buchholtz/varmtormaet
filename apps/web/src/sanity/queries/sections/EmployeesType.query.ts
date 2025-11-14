import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'

const Employee_Query = groq`
  title,
  _createdAt,
  email,
  "priority": coalesce(priority, 9999),
  image {
    ${ImageQuery}
  },
  _type,
  position,
  phone,
  _rev,
  _id,
  _updatedAt
`

const Manual = groq` 
view == "manual" => employees[]-> {
  ${Employee_Query}
}

`
const Department = groq`
  "department": department[]-> {
  ...,
    "employees": *[_type == "employee" && references(^._id)] | order(priority asc, _createdAt asc) {
      ${Employee_Query}
  }
}

`

const All = groq`
view == "all" => *[_type == "employee"] | order(priority asc, _createdAt asc) {
  ${Employee_Query}
}

`

export const EmployeesTypeQuery = groq`
_type == "EmployeesType" => {
  heading,
  "departmentTitle": department[0]->.title,
  ...,
  "employees": select(
    ${Manual}, 
    ${All}
  ),
  ${Department}
}

`
