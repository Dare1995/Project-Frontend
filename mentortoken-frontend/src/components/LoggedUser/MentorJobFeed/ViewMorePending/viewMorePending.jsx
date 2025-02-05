import Logo from "../../../../images/logo.svg";
import Xbtn from "../../../../images/loginpage/x-button.svg";
import MentorReviewCard from "../MentorReviewCard/mentorReviewCard";
import "./viewMorePending.css";

const ViewMorePending = ({job, image=Logo,company, handleViewMore, mentors = [] , aplications = [], handleRenew}) => {
  return (
    <div className="view-more-pending">
    <div className="view-card-pending">
        <div className="close-icon">
    <img src={Xbtn} alt="Close" onClick={handleViewMore}></img>
        </div>
        <div className="more-job-card-items">
    <div className="picture-name">
          <img src={company.image ? company.image : image}/>
          <p>{company.name ? company.name : "No data"}</p>
        </div>
       <p className="card-job-name">{job.title ? job.title : "No data"}</p>
       <p className="card-desc">{job.description ? job.description : "No data" }</p>
       <p className="card-job-name">Mentors that applied to the job</p>
       <div className="applied-mentors-box">
  {mentors && aplications ? (
    aplications.map((aplication) => {
      const mentor = mentors.find((mentor) => mentor._id === aplication.mentorId);
      
      return mentor ? (
        <MentorReviewCard
          key={aplication._id}  // Ensure each card has a unique key
          jobAplication={aplication}
          mentor={mentor}
          type={"company"}
          handleRenew={handleRenew}
          handleViewMore={handleViewMore}
        />
      ) : null;
    })
  ) : (
    <MentorReviewCard />
  )}
</div>
        </div>
    </div>
</div>
  );
};

export default ViewMorePending

