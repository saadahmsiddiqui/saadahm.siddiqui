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
    <header className="flex p-5">
      <title>{data.title}</title>

      <div className="flex flex-col flex-2 bg-green">
        <p className="text-3xl font-semibold mt-3">{data.personal.name}</p>
        <p className="text-xl font-medium mt-2">Berlin, DE</p>
        <p className="text-md mt-2">{data.personal.phone}</p>
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
