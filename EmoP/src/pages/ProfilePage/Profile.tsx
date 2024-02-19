import Footer from "@/shared/Footer";
import Header from "@/shared/Header";

const Profile = () => {
  return (
    <>
      <Header></Header>
      <div className="containers flex w-screen h-screen fon justify-center items-center">
        <h1 className="text-4xl">Эта страница в разработке, можете пока оставить обращение!</h1>
        {/* <div className="UserInfoBlock">
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
        </div> */}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
