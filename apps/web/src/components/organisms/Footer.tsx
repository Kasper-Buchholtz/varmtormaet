import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Icon from '@repo/sanity-web/src/components/Icons'
import Logo from '../atoms/Logo'
import useFooterData from '@/hooks/useFooterData'
import Section from '../sections/Section'
import { clean } from '@/utils/sanitize'
import { useParams } from 'next/navigation'
import { FOOTER_QUERYResult } from 'sanity.types'

/**
 *
 * @returns: En footer, der viser virksomhedsoplysninger og links til sociale medier.
 * @example: <Footer />
 * @alias: Footer
 * @summary: Denne komponent bruges til at vise virksomhedsoplysninger og links til sociale medier.
 * @version: 1.0.0
 * @property: []
 * @author: Kasper Buchholtz
 *
 **/

export default function Footer() {
  const locale = useParams().locale
  const data = useFooterData(locale) as FOOTER_QUERYResult
  return (
    <Section
      tag="footer"
      variant="dark"
      paddingTop="none"
      paddingBottom="none"
      className="py-8 pt-14"
    >
      <Footer.ColumnOne
        data={data}
        className="col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6"
      />
      <Footer.ColumnThree
        data={data}
        className="col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6"
      />
      <Footer.ColumnFour
        data={data}
        className="col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6"
      />
      <Footer.ColumnTwo
        data={data}
        className="col-span-full sm:col-span-full md:col-span-3 lg:col-span-3 xl:col-span-6"
      />
      <div className="h-0.5 w-full hidden sm:block bg-superego-green col-span-full" />
      <Footer.Legal data={data} />
    </Section>
  )
}

Footer.ColumnOne = ColumnOne
Footer.ColumnTwo = ColumnTwo
Footer.ColumnThree = ColumnThree
Footer.ColumnFour = ColumnFour
Footer.Legal = Legal

function ColumnOne({ data, className }) {
  const social = data?.social
  return (
    <div className={className}>
      <Link title="Gå til forside" className="text-superego-light-base" href="/">
        <Logo className="w-full h-auto max-w-xs" variant="light" />
      </Link>
      <ul className="flex flex-wrap justify-center mx-auto mt-8 max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
        {social?.map((item, index) => (
          <li key={index}>
            <Link
              className="fill-white *:size-6 hover:fill-superego-green transition-colors"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="" type={clean(item.platform)} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ColumnTwo({ data, className }) {
  const address = data?.object?.adressBook
  const cvr = data?.object?.cvr
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Addresse
        </Heading>
      </div>
      <div className="space-y-2 text-center md:text-left">
        <p>
          {address?.street} <br /> {address?.zip}
        </p>
        <p>{cvr}</p>
      </div>
    </div>
  )
}

function ColumnThree({ data, className }) {
  const phone = data?.object?.telephone
  const email = data?.object?.email
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Kontakt
        </Heading>
      </div>
      <div className="*:block space-y-2 text-center md:text-left">
        <a href={`tel:${phone}`}>{phone}</a>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  )
}

function ColumnFour({ data, className }) {
  const openingHours = data?.openingHours
  return (
    <div className={className}>
      <div className="pb-4 uppercase ">
        <Heading
          className="text-center text-superego-light-light md:text-left"
          spacing="none"
          tag="h5"
          size="xs"
        >
          Åbningstider
        </Heading>
      </div>

      <ul className="space-y-2 text-center md:text-left">
        {openingHours?.map((item, listIndex) => (
          <li className="text-center md:text-left" key={listIndex}>
            <span>{item.day}</span>
            <span> - </span>
            <span>{item.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Legal({ data }) {
  const companyName = data?.object?.companyName
  return (
    <div className="space-y-6 col-span-full">
      <div className="flex flex-col justify-center gap-1 text-center sm:text-left sm:flex-row sm:justify-between text-[14px]">
        <p className="text-[14px]">{`© ${new Date().getFullYear()} ${companyName}`}</p>
        <p className="text-[14px]">
          <Link href="/privacy-policy">Privatlivspolitik</Link>
        </p>
        <p className="text-[14px]">
          <Link href="/cookiepolitik">Cookiepolitik</Link>
        </p>
        <p className="relative text-[14px] ">
          <a
            className="before:absolute before:-right-[11px] before:rounded-full before:animate-bounce duration-1000 before:bottom-[5px] before:size-[7px] before:block  hover:before:bg-superego-green"
            href="https://superego.nu/kontakt/holstebro"
            target="_blank"
            rel="noreferrer"
          >
            Website by
            <span className="transition-all">&nbsp;Superego</span>
          </a>
        </p>
      </div>
    </div>
  )
}
