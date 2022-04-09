import "../styles/Home.scss";
import Navigation from "../components/Navigation";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal"

const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <Modal open={false}/>
      <main>
        <div className="container">
          <Content />
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
export default Home;
