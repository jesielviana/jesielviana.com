import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import SocialButtons from '@/components/SocialButtons'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

export default function PostLayout ({
  frontMatter,
  authorDetails,
  next,
  prev,
  availableLocales,
  children
}) {
  const { slug, date, title, summary, readingTime } = frontMatter
  const roundedReadingTime = Math.round(readingTime.minutes)
  const { t } = useTranslation()
  const { locale } = useRouter()
  const postUrl = `${siteMetadata.siteUrl}/blog/${slug}`

  return (
    <SectionContainer>
      <BlogSEO
        availableLocales={availableLocales}
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article className='md:w-5/6 mx-auto'>
        <div>
          <header>
            <div className='pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700'>
              <dl>
                <div>
                  <dt className='sr-only'>{t('common:pub')}</dt>
                  <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <span className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                {roundedReadingTime} {roundedReadingTime === 1 ? ' minute ' : ' minutes ' + ' read '}
              </span>
            </div>
          </header>
          <div
            className='pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 '
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2'>
              <div className='pt-10 pb-8 prose dark:prose-dark max-w-none'>{children}</div>
            </div>
            <SocialButtons postUrl={postUrl} title={title} summary={summary} />
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className='flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base'>
                {prev && (
                  <div className='pt-4 xl:pt-8'>
                    <Link
                      href={`/blog/${prev.slug}`}
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className='pt-4 xl:pt-8'>
                    <Link
                      href={`/blog/${next.slug}`}
                      className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
