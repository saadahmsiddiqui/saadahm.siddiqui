import data from "../assets/data.json";
import { formatTimestamp } from "../utilts";

function Education() {
  return (
    <>
      <div className="pl-5">
        <p className="text-2xl font-bold">Education</p>
      </div>
      <div className="p-5">
        {data.education.map(
          ({ startDate, endDate, degreeTitle, institute, city, country }) => (
            <div className="flex flex-col mb-2">
              <p className="text-xl font-semibold">{degreeTitle}</p>
              <p className="text-sm font-medium">{institute}</p>
              <p className="text-sm font-medium">{city + ', ' + country}</p>
              <p className="text-sm font-normal">
                {formatTimestamp(startDate) + " "}-{" "}
                {formatTimestamp(endDate)}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Education;
