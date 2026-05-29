import { LinkedInLogoIcon, InstagramLogoIcon, MobileIcon } from "@radix-ui/react-icons";

const links = [
  { href: "https://linkedin.com/in/saadjhk", Icon: LinkedInLogoIcon },
  { href: "https://www.instagram.com/saadahm.siddiqui", Icon: InstagramLogoIcon },
  { href: "tel:491772046189", Icon: MobileIcon}
];

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-3 text-zinc-800">
        {links.map((link) => (
          <a className="cursor-pointer" href={link.href}>{<link.Icon className="h-4 w-4" />}</a>
        ))}
      </div>

      <div className="flex items-center gap-6 text-xs text-zinc-500">
        <a className="cursor-pointer" href="mailto:saadahm.siddiqui@gmail.com">saadahm.siddiqui@gmail.com</a>
      </div>
    </div>
  );
}
