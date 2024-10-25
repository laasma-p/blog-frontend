import Header from "./Header";
import FeaturedPosts from "./FeaturedPosts";
import Posts from "./Posts";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-white-smoke min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <FeaturedPosts />
        <Posts />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
