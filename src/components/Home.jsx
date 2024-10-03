import Header from "./Header";
import FeaturedPosts from "./FeaturedPosts";
import Posts from "./Posts";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-white-smoke">
      <Header />
      <FeaturedPosts />
      <Posts />
      <Footer />
    </div>
  );
};

export default Home;
