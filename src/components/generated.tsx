import Footer from "./footer";
import Header from "./header";

export function Generated() {
  return (
    <div className="bg-neutral-100 max-w-7xl rounded-xl shadow-lg p-8 text-sm text-zinc-700">
      <Header />

      <hr className="border-dashed border-zinc-300 mb-6" />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-lime-400 rounded-md"></div>
            <div>
              <h1 className="font-semibold text-zinc-800">Saad Ahmed Siddiqui</h1>
              <p className="text-xs uppercase text-zinc-500">Entrepreneur&nbsp;/&nbsp;Developer</p>
            </div>
          </div>

          <p>
            I'm Sasha Mozdir. I build editorial systems and content-first
            websites. I run Chemmedia — a digital agency helping growing brands
            and established companies clarify their message and launch it
            without noise. I live in Tbilisi, Georgia, but I work with clients
            across Europe, Canada 🇨🇦, US 🇺🇸.
          </p>

          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-2">Study</h2>
            <p>
              I studied Philosophy and Design at Parsons School of Design in New
              York and finished a dual degree at Goldsmiths, University of
              London. Later, I trained in content architecture and interface
              writing at Hyper Island.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-2">Experience</h2>
            <p>
              At Coole, I led content structure workshops and improved interface
              copy for a mobile release. At Pitch, I worked on editorial tone
              migration across six markets and built an internal micro-wiki to
              support product storytelling. At Sportics, I contributed to public
              template kits and launched content guidelines used by millions.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-2">Info</h2>
            <p>
              Fluent in English. I work as an independent entrepreneur with a
              Georgian residence permit. I use tools like Notion, Framer, Figma,
              SEO platforms, and ChatGPT to build structured content systems and
              lead editorial teams.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs uppercase text-zinc-400">Cases</h2>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-zinc-800 text-white flex items-center justify-center rounded-md">
              *
            </div>
            <div>
              <p className="font-medium text-zinc-800">
                Full Editorial System for a European Appliance Brand
              </p>
              <p className="text-xs text-zinc-500">4/23/25 • NDA</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-pink-400 text-white flex items-center justify-center rounded-md">
              *
            </div>
            <div>
              <p className="font-medium text-zinc-800">
                1M Reads/Year From Fewer Than 100 Articles
              </p>
              <p className="text-xs text-zinc-500">4/22/25 • NDA</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-md">
              *
            </div>
            <div>
              <p className="font-medium text-zinc-800">
                From Zero to Content-Ready in 4 Weeks
              </p>
              <p className="text-xs text-zinc-500">4/10/25 • ST</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-teal-400 text-white flex items-center justify-center rounded-md">
              *
            </div>
            <div>
              <p className="font-medium text-zinc-800">
                Launching a Fintech Blog
              </p>
              <p className="text-xs text-zinc-500">3/18/25 • Coole</p>
            </div>
          </div>

          <button className="border rounded-full px-4 py-1 text-xs mt-2">
            ALL
          </button>

          <div className="text-white rounded-lg h-32 flex flex-col mt-6 border-2 boder-green-800">
            <textarea id="short-message" className="w-full"></textarea>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
