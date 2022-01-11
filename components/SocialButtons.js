import { LinkedinShareButton, TwitterShareButton } from 'react-share'
import TwitterIcon from '@/components/social-icons/twitter.svg'
import LinkedinButton from '@/components/social-icons/linkedin.svg'
import Link from '@/components/Link'
import useTranslation from 'next-translate/useTranslation'
import siteMetadata from '@/data/siteMetadata'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`
const discussUrl = (postUrl) => `https://twitter.com/search?q=${encodeURIComponent(postUrl)}`

const SocialButtons = ({ postUrl, title, summary }) => {
  const { t } = useTranslation()
  return (
    <div className="md:flex justify-between items-center pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
      <div className="mb-6 md:mb-0">
        {/* <Link href={discussUrl(postUrl)} rel="nofollow">
          {'Discuss on Twitter'}
        </Link>
        {` • `}
        <Link href={editUrl(fileName)}>{'View on GitHub'}</Link> */}
      </div>
      <div className="flex items-center">
        <TwitterShareButton
          url={postUrl}
          title={title}
          via={siteMetadata.twitterUser}
          className="flex items-center !p-1.5 mr-2 !bg-[#1da1f2] rounded overflow-hidden"
        >
          <TwitterIcon className="w-5 h-5" fill="#fff" />
          <span className="ml-2.5 mr-1.5 font-extrabold text-white">Tweet</span>
        </TwitterShareButton>
        <LinkedinShareButton
          url={postUrl}
          source={postUrl}
          title={title}
          summary={summary}
          className="flex items-center !p-1.5 mr-2 !bg-[#1666c2] rounded overflow-hidden"
        >
          <LinkedinButton className="w-5 h-5" fill="#fff" />
          <span className="ml-2.5 mr-1.5 font-extrabold text-white">{t('common:share')}</span>
        </LinkedinShareButton>
      </div>
    </div>
  )
}

export default SocialButtons
