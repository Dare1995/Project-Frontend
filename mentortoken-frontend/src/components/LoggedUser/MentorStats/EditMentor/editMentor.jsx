import React, { useEffect, useState } from "react"
import "./EditMentor.css"
import InputWithLabel from "../../../InputWithLabel/inputwithlabel"
import Button from "../../../Button/Button";
import Xbtn from "../../../../images/loginpage/x-button.svg"
import PhotoSelection from "../../../RegisterPage/PhotoSelection.jsx/photoselection";

const EditMentor = ({ handleEditMentor, user }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [desc, setDesc] = useState(user.desc);
  const [role, setRole] = useState(user.role);
  const [skill, setSkill] = useState();
  const [skills, setSkills] = useState(user.skills);
  const [image, setImage] = useState(user.image);
  const [editImg, setEditImg] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    setToken(storedToken);
  }, [])

  const addSkill = (e) => {
    e.preventDefault();
    if (skill !== "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
  }
  const deleteSkill = (e, index) => {
    e.preventDefault();
    const mySkills = skills.filter((skil, i) => (skil && i !== index));
    setSkills(mySkills);
  }
  const cancelEdit = (e) => {
    e.preventDefault();
    handleEditMentor({});
  };

  const selectPicture = () => {
    setEditImg(!editImg);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setEditImg(false);
    }
  };
  const editUser = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          phone,
          desc,
          role,
          skills,
          image
        }),
      });
      const data = await userResponse.json()
      handleEditMentor(data);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  return (
    <div className="mentor-edit">
      <form className="edit-form" onSubmit={(e) => editUser(e)}>
        <div className="close-edit-form">
          <img src={Xbtn} onClick={cancelEdit}></img>
        </div>
        <div className="photo-selection">
          <PhotoSelection photo={image} selectPicture={selectPicture} />
          {editImg ?
            <div className="photo-input-edit">
              <input type="file" onChange={handleImageUpload} />
            </div> : null
          }
        </div>
        <InputWithLabel
          value={name}
          label="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={name}
          required
        />
        <InputWithLabel
          value={role}
          label="Position"
          id="role"
          onChange={(e) => setRole(e.target.value)}
          type="text"
          placeholder={role}
          required
        />
        <InputWithLabel
          value={phone}
          label="Phone"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder={phone}
          required
        />
        <div className="skill-section">
          <InputWithLabel
            value={skill}
            label="Skill"
            id="Skill"
            onChange={(e) => setSkill(e.target.value)}
            type="text"
            placeholder="Skill"
            required={skills.length === 0}
          />
          <Button
            name={"Add skill"}
            width={"150px"}
            type={"submit"}
            mySubmit={(e) => { addSkill(e) }}
          />
        </div>
        <div className="skill-display">
          {skills.map((skil, index) => (
            <p key={index}>{skil}
              <button
                onClick={(e) => deleteSkill(e, index)}
              > X </button>
            </p>
          ))}
        </div>
        <textarea
          value={desc}
          type="text"
          name="description"
          placeholder="Tell us something about you"
          id="description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button
          name={"Update info"}
          width={"100%"}
        />
      </form>
    </div>

  )
}

export default EditMentor