import { useState, useEffect } from "react";
import PhotoCam from "../../../images/loginpage/PhotoCam.svg";
import PhotoCircle from "../../../images/loginpage/PhotoCircle.svg";
import Logo from "../../../images/logo.svg";
import "./photoselection.css";

const PhotoSelection = ({ photo = null, selectPicture = () => { } }) => {
    const [image, setImage] = useState(photo || Logo);

    useEffect(() => {
        setImage(photo || Logo);
    }, [photo]);

    return (
        <div className="photo-selection" onClick={selectPicture}>
            <img className="img-circle" src={PhotoCircle} alt="Photo Circle" />
            <img className="img-cam" src={PhotoCam} alt="Photo Cam" />
            <img className="img-account" src={image} alt="User Selected" />
        </div>
    );
};

export default PhotoSelection;