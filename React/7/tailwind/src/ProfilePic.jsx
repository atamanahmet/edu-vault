import profile from "./img/profile.jpg";
function ProfilePic() {
  return (
    <div>
      <a href="/profile">
        <img
          src={profile}
          alt="profile photo"
          className="h-10 w-10 rounded-full"
        />
      </a>
    </div>
  );
}
export default ProfilePic;
