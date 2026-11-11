import { hobbies } from "../content/hobbies";
import Container from "./container";
import PageIntro from "./page-intro";

export default function Hobbies() {
  return (
    <Container>
      <PageIntro title="Hobbies">What I do when I’m not building software.</PageIntro>
      <dl className="mt-16 border-t border-deep">
        {hobbies.map((hobby) => (
          <div key={hobby.title} className="border-b border-deep py-5">
            <dt className="text-paper">{hobby.title}</dt>
            <dd className="mt-2 max-w-[34rem] leading-relaxed text-dust lg:max-w-[42rem]">
              {hobby.body}
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
