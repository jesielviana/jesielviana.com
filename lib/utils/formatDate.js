// import siteMetadata from '@/data/siteMetadata'

const formatDate = (date, locale) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const now = new Date(date)
    .toLocaleDateString(locale, options)
    .split(' ') // needed to be congruent with en (uperCamelCase)
    .map((e) => (e.length > 2 ? e[0].toUpperCase() + e.substring(1) : e))
    .join(' ')

  return now
}

export default formatDate
