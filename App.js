import 'react-native-gesture-handler';
import { CombinePages } from "./pages/combine";
import { Provider as PaperProvider } from "react-native-paper";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


function App() {
  return (
    <PaperProvider>
      <CombinePages/>
    </PaperProvider>
  );
}

export default gestureHandlerRootHOC(App);