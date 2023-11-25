import "./App.css";
import Pages from "./Componenets/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Componenets/AppContext/AppContext";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppContext>
                    <Pages />
                </AppContext>
            </BrowserRouter>
        </div>
    );
}

export default App;