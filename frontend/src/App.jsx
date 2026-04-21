import { useSocket } from "./hooks/useSocket";

function App() {
  const { socket, connected } = useSocket();
  return (
    <div>
      {`This is Socket io Client Testing ${connected} `}
      {/* <h1>{socket.id}</h1> */}
    </div>
  );
}

export default App;
