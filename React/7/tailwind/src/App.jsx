import Search from "./Search";
import Nav from "./Nav";
import NavRight from "./NavRight";
// import LeftSection from "./LeftSection";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div id="nav-header" className="bg-primary h-14 ">
        <div
          id="container"
          className="ml-2 mr-2 flex items-center justify-between"
        >
          <Search />
          <Nav />
          <NavRight />
        </div>
        <main className="bg-primary h-screen ">
          {/* <LeftSection></LeftSection> */}
        </main>
      </div>
    </>
  );
}

export default App;
