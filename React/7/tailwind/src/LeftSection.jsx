import ProfilePic from "./ProfilePic";
function LeftSection() {
  return (
    <section id="left-section" className="m-5">
      <ul>
        <li>
          <ProfilePic></ProfilePic>
        </li>
        <li>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/-GSeaf19sqF.png"
            alt=""
          />
          {/* <i
            data-visualcompletion="css-img"
            style='background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/-GSeaf19sqF.png"); background-position: 0px -333px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;'
          ></i> */}
        </li>
      </ul>
    </section>
  );
}
export default LeftSection;
