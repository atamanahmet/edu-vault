import Search from "./Search";
import Nav from "./Nav";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-primary h-14 flex flex-row flex-nowrap items-center">
        <Search />
        <Nav />
      </div>
    </>
  );
}

export default App;
