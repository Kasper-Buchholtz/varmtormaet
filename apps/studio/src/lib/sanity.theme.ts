import { buildLegacyTheme } from 'sanity'

const props = {
  /* standard farver */
  '--my-blue': '#4285f4',
  '--my-red': '#db4437',
  '--my-yellow': '#f4b400',

  /* superego farver */
  '--my-dark': '#242B31',
  '--my-grey': '#5F727F',
  '--my-white': '#FCFCFC',
  '--my-grey-40': '#AFB7BD',
  '--my-grey-10': '#EFF1F2',
  '--my-green': '#3BE086',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-dark'],
  '--white': props['--my-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--my-white'],
  '--component-text-color': props['--my-dark'],

  /* Brand */
  '--brand-primary': props['--my-dark'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--my-dark'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  /* State */
  '--state-info-color': props['--my-blue'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-dark'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--my-dark'],

  '--font-family-base': 'SuperSans, sans-serif',
})
