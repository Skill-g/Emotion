import Footer from "@/shared/Footer";
import Header from "@/shared/Header";

const Chat = () => {
 const chatBlocks = Array.from({ length: 7 }, (_, index) => (
    <div key={index} className="chats">
      {/* Здесь вы можете добавить содержимое внутрь блока, если это необходимо */}
    </div>
  ));
  return (
    <>
      <Header></Header>
      <div className="containers w-screen h-screen bg-chat">
        <div className="chat-block">
            <div className="left-chats">
{chatBlocks}
            </div>
            <div className="center-diolog">

            </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Chat;
