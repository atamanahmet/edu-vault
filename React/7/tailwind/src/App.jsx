import Search from "./Search";
import Nav from "./Nav";
import NavRight from "./NavRight";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-primary h-14 ">
        <div className="flex flex-row flex-nowrap gap-x-36">
          <Search />
          <Nav />
          <NavRight />
        </div>
        {/* <div className="grid grid-cols-3 gap-x-7">
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div> */}
      </div>
    </>
  );
}

export default App;
