import { Link } from "react-router-dom";

const Aboutpage = () => {
  return (
    <>
      <h1>This is About page</h1>
      <ul>
        <li>
          <Link to="contacts">Our Contacts</Link>
        </li>
        <li>
          <Link to="team">Our Team</Link>
        </li>
      </ul>
    </>
  );
};

export default Aboutpage;
