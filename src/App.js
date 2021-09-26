import React from "react";
import {Route, Switch} from "react-router-dom";
import Fermier from "./components/Dashboard/Fermier/Fermiers"
import AjouterFermier from "./components/Dashboard/Fermier/AjouterFermier";
import Fermes from "./components/Dashboard/Fermes/Fermes";
import AjouterFermes from "./components/Dashboard/Fermes/AjouterFerme";
import ModifierFerme from "./components/Dashboard/Fermes/ModifierFerme";
import AjouterSocietes from "./components/Dashboard/Societes/AjouterSociete";
import ModifierSociete from "./components/Dashboard/Societes/ModifierSociete";
import ModifierFermier from "./components/Dashboard/Fermier/ModifierFermier";
import AffecterFermier from "./components/Dashboard/Fermier/AffecterFermier";
import AffecterFermes from "./components/Dashboard/Societes/AffecterFermes";
import AjouterStock from "./components/Dashboard/Stocks/AjouterStock";
import Stocks from "./components/Dashboard/Stocks/Stocks";
import ModifierStock from "./components/Dashboard/Stocks/ModifierStock";
import AjouterCategorieStock from "./components/Dashboard/CategorieStock/AjouterCategorieStock";
import CategorieStocks from "./components/Dashboard/CategorieStock/CategorieStocks";
import ModifierCategorieStock from "./components/Dashboard/CategorieStock/ModifierCategorieStock";
import AjouterVaches from "./components/Dashboard/Vaches/AjouterVache";
import Vaches from "./components/Dashboard/Vaches/Vaches";
import Societes from "./components/Dashboard/Societes/Societes";
import ModifierVaches from "./components/Dashboard/Vaches/ModifierVache";
import AjouterVeaux from "./components/Dashboard/Veaux/AjouterVeaux";
import Veaux from "./components/Dashboard/Veaux/Veaux";
import ModifierVeaux from "./components/Dashboard/Veaux/ModifierVeaux";
import Dashboard from "./components/Dashboard/Home/Dashboard";
import Login from "./components/Dashboard/Login/Login";
import Error404 from "./components/Dashboard/ErrorPages/ErrorPage404";
import Error400 from "./components/Dashboard/ErrorPages/ErrorPage400";
import Error403 from "./components/Dashboard/ErrorPages/ErrorPage403";
import Error500 from "./components/Dashboard/ErrorPages/ErrorPage500";
import Error503 from "./components/Dashboard/ErrorPages/ErrorPage503";
function App(props) {
    return (
        <div className="App" Style="letter-spacing: 0.7px;font-family: Roboto;text-transform: capitalize;">
            <Switch>
                <Route exact={true} path={"/"} render={(props)=><Login {...props} />} />
                <Route path={"/Error404"} render={(props)=><Error404 {...props} />} />
                <Route path={"/Error400"} render={(props)=><Error400 {...props} />} />
                <Route path={"/Error403"} render={(props)=><Error403 {...props} />} />
                <Route path={"/Error500"} render={(props)=><Error500 {...props} />} />
                <Route path={"/Error503"} render={(props)=><Error503 {...props} />} />
                <Route path={"/AffecterFermier"} render={(props)=><AffecterFermier {...props} />} />
                <Route path={"/AffecterFermes"} render={(props)=><AffecterFermes {...props} />} />
                <Route path={"/AjouterFermier"} render={(props)=><AjouterFermier {...props} />} />
                <Route path={"/AjouterStock"} render={(props)=><AjouterStock {...props} />} />
                <Route path={"/AjouterSociété"} render={(props)=><AjouterSocietes {...props} />} />
                <Route path={"/AjouterFermes"} render={(props)=><AjouterFermes {...props} />} />
                <Route path={"/AjouterCategorieStock"} render={(props)=><AjouterCategorieStock {...props} />} />
                <Route path={"/AjouterVache"} render={(props)=><AjouterVaches {...props} />} />
                <Route path={"/AjouterVeaux"} render={(props)=><AjouterVeaux {...props} />} />
                <Route path={"/Fermiers"} render={(props)=><Fermier {...props} />} />
                <Route path={"/Stocks"} render={(props)=><Stocks {...props} />} />
                <Route path={"/Sociétés"} render={(props)=><Societes {...props} />} />
                <Route path={"/Fermes"} render={(props)=><Fermes {...props} />} />
                <Route path={"/Vaches"} render={(props)=><Vaches {...props} />} />
                <Route path={"/Veaux"} render={(props)=><Veaux {...props} />} />
                <Route path={"/Dashboard"} render={(props)=><Dashboard {...props} />} />
                <Route path={"/CategorieStocks"} render={(props)=><CategorieStocks {...props} />} />
                <Route exact path="/ModifierSociété/:id" render={(props) => (<ModifierSociete id = {props.match.params.id} /> )}/>
                <Route path="/ModifierFermier/:id" render={(props) => <ModifierFermier id = {props.match.params.id} /> }/>
                <Route path="/ModifierStock/:id" render={(props) => <ModifierStock {...props} /> }/>
                <Route path="/ModifierCategorieStock/:id" render={(props) => <ModifierCategorieStock {...props} /> }/>
                <Route path="/ModifierVaches/:id" render={(props) => <ModifierVaches {...props} /> }/>
                <Route path="/ModifierVeaux/:id" render={(props) => <ModifierVeaux {...props} /> }/>
                <Route path="/ModifierFerme/:id" render={(props) => <ModifierFerme id = {props.match.params.id}/> }/>
                <Route component= {Error404}/>
            
            </Switch>
        </div>
    );
}

export default App;