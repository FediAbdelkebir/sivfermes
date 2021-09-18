import React from "react";
import {Route, Switch} from "react-router-dom";
import Fermier from "./components/Dashboard/Fermier/Fermiers"
import AjouterFermier from "./components/Dashboard/Fermier/AjouterFermier";
import Fermes from "./components/Dashboard/Fermes/Fermes";
import AjouterFermes from "./components/Dashboard/Fermes/AjouterFerme";
import ModiferFerme from "./components/Dashboard/Fermes/ModifierFerme";
import ModifierFermier from "./components/Dashboard/Fermier/ModifierFermier";
import AffecterFermier from "./components/Dashboard/Fermier/AffecterFermier";

function App(props) {
    return (
        <div className="App">
            <Switch>
                <Route exact={true} path={"/"} render={(props)=><Fermier {...props} />} />
                <Route path={"/AffecterFermier"} render={(props)=><AffecterFermier {...props} />} />
                <Route path={"/AjouterFermier"} render={(props)=><AjouterFermier {...props} />} />
                <Route path={"/Fermiers"} render={(props)=><Fermier {...props} />} />
                <Route path={"/AjouterFermes"} render={(props)=><AjouterFermes {...props} />} />
                <Route path={"/Fermes"} render={(props)=><Fermes {...props} />} />
                <Route exact path="/ModifierFerme/:id" render={(props) => (<ModiferFerme id = {props.match.params.id} /> )}/>
                <Route path="/ModifierFermier/:id" render={(props) => <ModifierFermier {...props} /> }/>
            
            </Switch>
        </div>
    );
}

export default App;