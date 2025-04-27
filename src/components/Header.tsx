import data from '../assets/data.json';
import LeetcodeLogo from '../assets/leetcode.png';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { TwitterLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type SocialIconProps = { name: string } & IconProps

function SocialIcon({ name, ...props }: SocialIconProps) {
  if (!name) return null; 

  switch(name) {
    case 'github':
      return <GitHubLogoIcon {...props} />
    case 'twitter':
      return <TwitterLogoIcon {...props} />
    case 'linkedin':
      return <LinkedInLogoIcon {...props} />
    case 'leetcode':
      return <img className={props.className} src={LeetcodeLogo} />
    default:
      return null;
  }
}


function Header() {
  return (
    <header className="flex p-5 bg-stone-800 shadow-xl/20">
      <title>{data.title}</title>

      <div className="flex flex-2 bg-green">
        <p className="text-2xl">{data.header}</p>
      </div>
      <div className="flex flex-1 gap-2 justify-end items-center">
        {data.links.map(({ title, link, name }) => (
          <a target='_black' href={link}>{name ? <SocialIcon className='h-5 w-5' name={name} /> : title} </a>
        ))}
      </div>
    </header>
  );
}

export default Header;
