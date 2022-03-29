import "../styles/Home.scss";
import Navigation from "../components/Navigation";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="home">
      <Navigation />
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
