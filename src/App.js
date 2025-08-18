import {Route, Switch, BrowserRouter} from "react-router-dom"
import MenuCard from './components/MenuCard'
import './App.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MenuCard}/>
        </Switch>
    </BrowserRouter>
)

export default App
