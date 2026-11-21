import { LuBriefcase, LuCamera, LuClapperboard, LuCode, LuGamepad2 } from "react-icons/lu";

// The Explore section on the home page. `icon` is shown above each title.
export const explore = [
  {
    title: "Projects",
    body: "Things I’ve built, and what I learned building them.",
    to: "/projects",
    icon: LuCode,
  },
  {
    title: "Work experience",
    body: "Eight roles across Karachi, Berlin and remote teams.",
    to: "/work-experience",
    icon: LuBriefcase,
  },
  {
    title: "Photography",
    body: "Photos from the cities I’ve lived in and travelled through.",
    to: "/photography",
    icon: LuCamera,
  },
  // {
  //   title: "Hobbies",
  //   body: "Badminton, padel, philosophy, and the occasional cat.",
  //   to: "/hobbies",
  //   icon: LuHeart,
  // },
  {
    title: "Media",
    body: "Music, podcasts, and other forms of media I enjoy.",
    to: "/media",
    icon: LuClapperboard,
  },
  {
    title: "Gaming",
    body: "Video games that I play or have enjoyed in the past.",
    to: "/gaming",
    icon: LuGamepad2,
  },
] as const;
