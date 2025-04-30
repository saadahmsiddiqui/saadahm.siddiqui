import data from "../assets/data.json";
import LeetcodeLogo from "../assets/leetcode.png";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

type SocialIconProps = { name: string } & IconProps;

function SocialIcon({ name, ...props }: SocialIconProps) {
  const defaultStyles = { height: '15px', width: '15px' }
  if (!name) return null;

  switch (name) {
    case "github":
      return <GitHubLogoIcon style={defaultStyles} {...props} />;
    case "twitter":
      return <TwitterLogoIcon style={defaultStyles} {...props} />;
    case "linkedin":
      return <LinkedInLogoIcon style={defaultStyles} {...props} />;
    case "leetcode":
      return <img style={defaultStyles} className={props.className} src={LeetcodeLogo} />;
    default:
      return null;
  }
}

function Header() {
  return (
    <header className="flex pt-5 pl-5">
      <title>{data.title}</title>

      <div className="flex flex-col flex-2 bg-green">
        <p className="text-3xl font-semibold mt-3">{data.personal.name}</p>
        <p className="text-xl font-medium mt-2">Berlin, Deutschland</p>
        <p className="text-md mt-2">
          {data.personal.phone + " | " + data.personal.email}
        </p>
        <div className="mt-2 flex ">
          {data.links.map(({ title, link, name }, idx) => (
            <div className={`flex items-center gap-2 ${idx > 0 ? 'ml-2' : undefined}`}>
              <SocialIcon name={name} />
              <a className="text-md underline" href={link}>{title}</a>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
