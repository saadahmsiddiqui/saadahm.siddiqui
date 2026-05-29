import Footer from "./footer";
import Header from "./header";
import Messages from "./messages";

export default function Main() {
  return (
    <div className="m-[2rem] md:m-0 bg-neutral-100 max-w-7xl rounded-xl shadow-xl p-8 text-sm text-zinc-700">
      <Header />

      <hr className="border-dashed border-zinc-300 mb-6" />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 md:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <img src="profile.jpeg" className="w-10 h-10 rounded-md" />
            <div>
              <h1 className="font-semibold text-zinc-800">
                Saad Ahmed Siddiqui
              </h1>
              <p className="text-xs uppercase text-zinc-500">
                Entrepreneur&nbsp;/&nbsp;Developer
              </p>
            </div>
          </div>

          <p>
            I’m a Karachi native now based in Berlin, spending the last 7 years
            building software across wildly different domains—from 24/7
            financial exchanges to climate disaster management systems, AI for
            software testing, and even platforms for buying and selling cars. I
            like working on things that matter (and sometimes things that move
            very fast). <br />
            <br />
            Outside of work, you’ll usually find me going down rabbit holes on
            systems design or philosophy, or hopping across cities—recently
            trading Berlin’s streets for the beaches of Barcelona, the deserts
            of Marrakech, and the markets of Istanbul. I play a bit of badminton
            and padel to stay sane, and I have a soft spot for cats (they seem
            to like me back, which feels like an achievement).
          </p>

          <div>
            <h2 className="text-xs uppercase text-zinc-400 mb-2">Beliefs</h2>
            <div className="ml-4">
              <p>
                I’d like to share a few things I believe in:
                <ul className="list-disc my-1">
                  <li className="mb-1">
                    <b>Family & friends</b> — Coming from a close-knit family
                    and a humble background, I’ve realized that without deep,
                    lasting relationships, life doesn’t feel truly fulfilling.
                  </li>
                  <li className="mb-1">
                    <b>Wealth Equality</b> — I believe wealth inequality is
                    harmful to society, even for those who benefit from it.
                    While the material advantages may seem obvious, the social
                    and moral consequences create a deeper, more damaging
                    imbalance.
                  </li>
                  <li>
                    <b>Religion</b> — Having a connection to religion is
                    important to me. It provides a moral compass and encourages
                    us to live for something beyond material success. Spiritual
                    fulfillment is something I strive for. My faith has its ups
                    and downs, but I always find myself returning to it.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-3 md:col-span-1 space-y-4">
          <Messages />
        </div>
      </div>

      <Footer />
    </div>
  );
}
