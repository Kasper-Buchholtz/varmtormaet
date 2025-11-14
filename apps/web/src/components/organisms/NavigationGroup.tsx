import { useParams } from 'next/navigation'
import MenuButton from '../atoms/MenuButton'
import Search from '../molecules/Search'
import { NavigationGroupProps } from '@/types/NavigationGroup.types'

/**
 *
 * @beskrivelse
 * `NavigationGroup` komponenten er en fleksibel og genanvendelig React-komponent designet til at håndtere navigation-relateret funktionalitet. Den inkluderer en søgebar, en menuknap og valgfrit en lokalitetsskifter (udkommenteret i den nuværende implementering). Denne komponent er stylet ved hjælp af Tailwind CSS-klasser.
 *
 * @eksempel
 * ```tsx
 * <NavigationGroup isOpen={isOpen} setIsOpen={setIsOpen} />
 * ```
 *
 * @props
 * - `isOpen` (boolean): Angiver, om menuen i øjeblikket er åben.
 * - `setIsOpen` (funktion): En funktion til at skifte `isOpen` tilstand.
 *
 * @afhængigheder
 * - `useParams` fra `next/navigation`: Bruges til at hente den aktuelle lokalitet.
 * - `Search` (molekyle): En søgebar-komponent.
 * - `MenuButton` (atom): En knap til at skifte menuens tilstand.
 * - `useNavigationData` (hook): (Importeret, men ikke brugt i den nuværende implementering).
 *
 * @version 1.0.0
 * @forfatter
 * Kasper Buchholtz
 */

const NavigationGroup = ({ isOpen, setIsOpen }: NavigationGroupProps) => {
  const locale = useParams().locale
  return (
    <div className="flex justify-end col-start-4 gap-6 md:col-start-6 xl:col-start-8 -col-end-1">
      <Search />
      {/* <LocaleSwitcher /> */}
      <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default NavigationGroup
