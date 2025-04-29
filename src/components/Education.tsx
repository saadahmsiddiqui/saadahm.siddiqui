import data from "../assets/data.json";
import { localizeUnixTimestamp } from "../utilts";

function Education() {
  return (
    <>
      <div className="pl-5">
        <p className="text-3xl font-bold">Education</p>
      </div>
      <div className="p-5">
        {data.education.map(
          ({ startDate, endDate, degreeTitle, institute }) => (
            <div className="flex flex-col mb-2">
              <p className="text-xl font-semibold">{degreeTitle}</p>
              <p className="text-md font-medium">{institute}</p>
              <p className="text-sm font-thin">
                {localizeUnixTimestamp(startDate) + " "}-{" "}
                {localizeUnixTimestamp(endDate)}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Education;
