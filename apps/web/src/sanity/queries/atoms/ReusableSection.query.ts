import groq from 'groq'
export const ReusableSectionQuery = groq`
_type == "ReusableSection" => {
    ...,
    reusable->{
      title,
      pageBuilder[]
    }
}
`
