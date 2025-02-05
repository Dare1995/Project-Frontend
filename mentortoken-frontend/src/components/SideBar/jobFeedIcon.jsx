// import "./navicon.css"

// const JobFeedIcon = ({ fillColor = "rgba(86, 106, 127, 1)", size = "24", name = "Job Feed" }) => (


//     <div className={`nav_icon${fillColor === "rgba(86, 106, 127, 1)" ? "" : "_background"}`}>
//         <svg
//             width={size}
//             height={size}
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             stroke={fillColor}
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
//             <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
//         </svg>
//         <span style={{ color: fillColor }}>{name}</span>
//     </div>
// );

// export default JobFeedIcon;

import "./navicon.css";

const JobFeedIcon = ({ fillColor = "rgba(86, 106, 127, 1)", size = "24", type = "mentor" }) => {
  // Dynamically set the name based on the type
  const name = type.toLowerCase() === "company" ? "Jobs" : "Job Feed";

  return (
    <div className={`nav_icon${fillColor === "rgba(86, 106, 127, 1)" ? "" : "_background"}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
      </svg>
      <span style={{ color: fillColor }}>{name}</span>
    </div>
  );
};

export default JobFeedIcon;
