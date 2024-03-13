import "./App.css";
import { Card } from "./components/ui/card";
import SearchInput from "./components/custom/SearchInput";
function App() {

  return (
    <div className="h-screen w-full py-6 flex justify-center items-center">
      <Card className="h-full w-full max-w-[356px] px-4 py-4 flex flex-col gap-2 items-center relative">
        <SearchInput />
      </Card>
    </div>
  );
}

export default App;
