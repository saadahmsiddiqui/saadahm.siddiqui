import data from "../assets/data.json";
import { formatWorkingExperienceTimeData } from "../utilts";

function WorkingExperience() {
  return (
    <>
      <div className="pl-5">
        <p className="text-2xl font-bold">Professional Experience</p>
      </div>
      <div className="p-5">
        {data.experience.map(
          ({ title, company, start, end }) => (
            <div key={company} className="flex flex-col mb-2 w-100">
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{title}</p>
                <p className="text-md font-medium">{company}</p>
                <p className="text-sm font-normal">{formatWorkingExperienceTimeData(start)} - {formatWorkingExperienceTimeData(end)}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default WorkingExperience;
