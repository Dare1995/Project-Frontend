import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import "./contact.css";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const contactMessageResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/contactMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          message,
          email,
        }),
      });

      const contactMessage = await contactMessageResponse.json();
      
      if (contactMessage) {
        alert(`Message was sent to Mentor Token!`);
        navigate("/");
      } else {
        alert(`Error, message was not sent to Mentor Token!`);
      }
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  return (
    <main>
      <div className="lets-talk">
        <div className="lets-talk-info">
          <h2>Let's Talk!</h2>
          <p>We're thrilled to connect with you! Whether you have a question,
            need assistance, or want to discuss a potential project,
            we're here to listen and help. At Mentor Token, we believe in
            the power of collaboration and are committed to providing you
            with the best support and solutions. Fill out the form below,
            and one of our team members will get back to you as soon as possible.</p>
          <span>Let's create something amazing together!</span>
        </div>

        <form className="lets-talk-form" onSubmit={sendMessage}>
          <div className="lets-talk-name-email">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Full Name"
              required />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              required />
          </div>

          <div className="text-area">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              placeholder="Your message"
              maxLength="1000"
              required />
            <p>{message.length}/1000</p>
          </div>

          <div className="form-button">
            <Button name={"SEND MESSAGE"} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
