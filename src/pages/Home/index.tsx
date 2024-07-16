import withAuth from "../../hocs/withAuth";

function Home() {
  return (
    <div className="bg-[url('./assets/background-home.jpg')] h-screen bg-no-repeat bg-cover flex">

    </div>
  )
}

const HomeWithAuth = withAuth(Home);

export default HomeWithAuth;
