import Logo from "../../../../images/logo.svg";
import Xbtn from "../../../../images/loginpage/x-button.svg";
import MentorReviewCard from "../MentorReviewCard/mentorReviewCard";
import "./viewMorePending.css";

const ViewMorePending = ({ job, image = Logo, company, handleViewMore, mentors = [], applications = [], handleRenew }) => {
  return (
    <div className="view-more-pending">
      <div className="view-card-pending">
        <div className="close-icon">
          <img src={Xbtn} alt="Close" onClick={handleViewMore} />
        </div>
        <div className="more-job-card-items">
          <div className="picture-name">
            <img src={company.image ? company.image : image} alt={company.name || "Company logo"} />
            <p>{company.name || "No data"}</p>
          </div>

          <p className="card-job-name">{job.title || "No data"}</p>
          <p className="card-desc">{job.description || "No data"}</p>
          <p className="card-job-name">Mentors that applied to the job</p>

          <div className="applied-mentors-box">
            {applications.length > 0 ? (
              applications.map((application) => {
                const mentor = mentors.find((mentor) => mentor._id === application.mentorId);
                return mentor ? (
                  <MentorReviewCard
                    key={application._id}
                    jobAplication={application}
                    mentor={mentor}
                    type="company"
                    handleRenew={handleRenew}
                    handleViewMore={handleViewMore}
                  />
                ) : null;
              })
            ) : (
              <p>No mentors have applied yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMorePending;
