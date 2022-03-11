import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import useTranslation from 'next-translate/useTranslation'

// import NewsletterForm, { BlogNewsletterForm } from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps ({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home ({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className='flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12'>
        <div className='pt-6'>
          <h1 className='pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14'>
            {t('common:greeting')}
          </h1>
          <h2 className='text-lg prose text-gray-600 dark:text-gray-400'>
            {t('common:summary')}
            <a href='https://webdev.jesielviana.com' rel='noreferrer' target='_blank'>
              {t('common:webdevebook')}
            </a>
            {`. ${t('common:goodRead')}`}
          </h2>
        </div>
        <div />
      </div>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='pt-6 pb-4 space-y-2 md:space-y-5'>
          <h1 className='text-3xl font-medium leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14'>
            {t('common:latest')}
          </h1>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className='py-12'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline'>
                    <dl>
                      <dt className='sr-only'>{t('common:pub')}</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </dd>
                    </dl>
                    <div className='space-y-3 xl:col-span-3'>
                      <div className='space-y-3'>
                        <div>
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link
                              href={`/blog/${slug}`}
                              className='text-gray-900 dark:text-gray-100'
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className='flex flex-wrap'>
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                          {summary}
                        </div>
                      </div>
                      <div className='text-base font-medium leading-6'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                          aria-label={`Read "${title}"`}
                        >
                          {t('common:more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className='flex justify-end text-base font-medium leading-6'>
          <Link
            href='/blog'
            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
            aria-label='all posts'
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className='flex items-center justify-center pt-4'>
          {/* <NewsletterForm title={t('newsletter:title')} /> */}
        </div>
      )}
    </>
  )
}
