import React from "react";
import {Route, Switch} from "react-router-dom";
import Fermier from "./components/Dashboard/Fermier/Fermiers"
import AjouterFermier from "./components/Dashboard/Fermier/AjouterFermier";
import Fermes from "./components/Dashboard/Fermes/Fermes";
import AjouterFermes from "./components/Dashboard/Fermes/AjouterFerme";
import ModiferFerme from "./components/Dashboard/Fermes/ModifierFerme";
import ModifierFermier from "./components/Dashboard/Fermier/ModifierFermier";
import AffecterFermier from "./components/Dashboard/Fermier/AffecterFermier";
import AjouterStock from "./components/Dashboard/Stocks/AjouterStock";
import Stocks from "./components/Dashboard/Stocks/Stocks";
import ModifierStock from "./components/Dashboard/Stocks/ModifierStock";
import AjouterCategorieStock from "./components/Dashboard/CategorieStock/AjouterCategorieStock";
import CategorieStocks from "./components/Dashboard/CategorieStock/CategorieStocks";
import ModifierCategorieStock from "./components/Dashboard/CategorieStock/ModifierCategorieStock";
import AjouterVaches from "./components/Dashboard/Vaches/AjouterVache";
import Vaches from "./components/Dashboard/Vaches/Vaches";
import ModifierVaches from "./components/Dashboard/Vaches/ModifierVache";
function App(props) {
    return (
        <div className="App">
            <Switch>
                <Route exact={true} path={"/"} render={(props)=><Fermier {...props} />} />
                <Route path={"/AffecterFermier"} render={(props)=><AffecterFermier {...props} />} />
                <Route path={"/AjouterFermier"} render={(props)=><AjouterFermier {...props} />} />
                <Route path={"/AjouterStock"} render={(props)=><AjouterStock {...props} />} />
                <Route path={"/AjouterFermes"} render={(props)=><AjouterFermes {...props} />} />
                <Route path={"/AjouterCategorieStock"} render={(props)=><AjouterCategorieStock {...props} />} />
                <Route path={"/AjouterVache"} render={(props)=><AjouterVaches {...props} />} />
                <Route path={"/Fermiers"} render={(props)=><Fermier {...props} />} />
                <Route path={"/Stocks"} render={(props)=><Stocks {...props} />} />
                <Route path={"/Fermes"} render={(props)=><Fermes {...props} />} />
                <Route path={"/Vaches"} render={(props)=><Vaches {...props} />} />
                <Route path={"/CategorieStocks"} render={(props)=><CategorieStocks {...props} />} />
                <Route exact path="/ModifierFerme/:id" render={(props) => (<ModiferFerme id = {props.match.params.id} /> )}/>
                <Route path="/ModifierFermier/:id" render={(props) => <ModifierFermier {...props} /> }/>
                <Route path="/ModifierStock/:id" render={(props) => <ModifierStock {...props} /> }/>
                <Route path="/ModifierCategorieStock/:id" render={(props) => <ModifierCategorieStock {...props} /> }/>
                <Route path="/ModifierVaches/:id" render={(props) => <ModifierVaches {...props} /> }/>
            
            </Switch>
        </div>
    );
}

export default App;