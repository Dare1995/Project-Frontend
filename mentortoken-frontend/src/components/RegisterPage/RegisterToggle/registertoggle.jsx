import { useEffect, useState } from "react"
import Button from "../../Button/Button"
import "./registertoggle.css"

const RegisterToggle = ({ typeUpdate }) => {
    const [type, setType] = useState("company");
    const [companyColor, setCompanyColor] = useState("");
    const [companyTextColor, setCompanyTextColor] = useState("");
    const [mentorColor, setMentorColor] = useState("");
    const [mentorTextColor, setMentorTextColor] = useState("");

    useEffect(() => {
        type === "company" ?
            (setCompanyColor("#696CFF"), setCompanyTextColor("#566A7F")) :
            (setCompanyColor("#F5F5F9")), setCompanyTextColor("#white");
        type === "mentor" ?
            (setMentorColor("#696CFF"), setMentorTextColor("#566A7F")) :
            (setMentorColor("#F5F5F9"), setMentorTextColor("white"));
        typeUpdate(type);
    }, [type]);

    const updateType = (e, value) => {
        e.preventDefault();
        setType(value);
    };

    return (
        <div className="toggle-register">
            <Button
                mySubmit={(e) => updateType(e, "company")}
                name="Company"
                width="50%"
                colour={companyColor}
                textColour={mentorTextColor}
            />

            <Button
                mySubmit={(e) => updateType(e, "mentor")}
                name="Mentor"
                width="50%"
                colour={mentorColor}
                textColour={companyTextColor}
            />
        </div>
    );
};

export default RegisterToggle