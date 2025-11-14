import React, { useState, useEffect } from 'react'
import { Spinner } from '@sanity/ui'

const ProjectManagerWidget: React.FC = () => {
  const [contactData, setContactData] = useState<{
    phone: any
    description: string
    email: string
    imgSrc: string
    name: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch the contact data from the proxy API route
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/proxyContact?url=${process.env.NEXT_PUBLIC_BASE_URL}`)

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.length > 0) {
          setContactData(data[0].contactInfo)
        } else {
          setError('No contact information found for this project')
        }
      } catch (error: any) {
        setError(`Failed to fetch contact data: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p>Indlæser data...</p>
      </div>
    )
  if (error) return <p>{error}</p>

  return (
    contactData && (
      <section className="flex h-full gap-8 p-4 pb-0 rounded-lg bg-light-0">
        <div className="pb-6">
          <h3 className="font-light leading-tight tracking-tight text-large">
            Har du brug for hjælp?
          </h3>
          <p className="pb-6 text-base max-w-prose">{contactData.description}</p>
          <p className="pb-12">
            Tlf:{' '}
            <a href={`tel:${contactData.phone}`} className="underline text-superego-green">
              {contactData.phone}
            </a>
            <br /> Mail:{' '}
            <a href={`mailto:${contactData.email}`} className="underline text-superego-green">
              {contactData.email}
            </a>
          </p>
        </div>

        <div>
          <img
            className="object-cover h-full rounded-t-full aspect-ratio-6-7 "
            src={contactData.imgSrc}
            alt={contactData.name}
            width={768}
            height={512}
          />
        </div>
      </section>
    )
  )
}

export default ProjectManagerWidget
