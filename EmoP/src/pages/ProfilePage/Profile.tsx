import Footer from "@/shared/Footer";
import Header from "@/shared/Header";

const Profile = () => {
  return (
    <>
      <Header></Header>
      <div className="containers fon">
        <div className="UserInfoBlock">
        <div className="profile">
        <div className="User">
            
            <div className="avatar">
                
                <div className="img-avatar"></div>
                <div>
                <h1>Привет! <b>{"username"}</b></h1>
                    <h1><b>{"age"}</b></h1>
                    <h1><b>{"gender"}</b></h1>
                </div>
            </div>
            
        </div>
        <div className="User-chat">
            chat
            </div>
            <div className="User-stat">
            stat
            </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
