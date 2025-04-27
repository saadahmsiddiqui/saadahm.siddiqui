import data from "../assets/data.json";
import { formatWorkingExperienceTimeData } from "../utilts";

function WorkingExperience() {
  return (
    <>
      <div className="pl-5">
        <p className="text-3xl font-bold">Working Experience</p>
      </div>
      <div className="p-5">
        {data.experience.map(
          ({ skills, title, company, start, end }) => (
            <div key={company} className="flex flex-col mb-2 w-100">
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{title}</p>
                <p className="text-md font-medium">{company}</p>
                <p className="text-sm font-thin">{formatWorkingExperienceTimeData(start)} - {formatWorkingExperienceTimeData(end)}</p>
              </div>
              <div className="flex gap-3 mt-2">
                {skills.map(s => <span className="rounded bg-stone-500 p-1 text-xs" key={s}>{s}</span>)}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default WorkingExperience;
