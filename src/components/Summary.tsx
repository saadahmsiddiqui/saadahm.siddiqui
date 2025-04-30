import data from "../assets/data.json";

function Summary() {
  return <div className="p-5"><p>{data.personal.summary}</p></div>;
}

export default Summary;
