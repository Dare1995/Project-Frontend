import "./navicon.css"

const MentorsIcon = ({ fillColor = "rgba(86, 106, 127, 1)", size = "24" }) => (
    <div className={`nav_icon${fillColor === "rgba(86, 106, 127, 1)" ? "" : "_background"}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        fill="none" 
        stroke={fillColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.45 10.79 7.56 8.84 7.56 6.44C7.56 3.99 9.54 2 12 2C14.45 2 16.44 3.99 16.44 6.44C16.43 8.84 14.54 10.79 12.16 10.87Z" />
        <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" />
      </svg>
      <span style={{ color: fillColor }}>Mentors</span>
    </div>
  );
  
  export default MentorsIcon;


  