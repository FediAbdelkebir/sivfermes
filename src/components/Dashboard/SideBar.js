import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../css/style.css';
import Header from './Header';
//import Head from './Head';
import Scripts from './Scripts';
import {Link} from "react-router-dom";

export default function SideBar() {
    return (
        <div style={{fontFamily: "'poppins', sans-serif"}}>
            {/*<Head />*/}
            <Header />
            
          <div className="deznav">
              
            <div className="deznav-scroll">
				<ul className="metismenu" id="menu">
                    
                <li><a className="has-arrow ai-icon"  aria-expanded="false">
                <i className="fa fa-seedling"></i>
							<span className="nav-text">Fermier</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterFermier`}><i className="fa fa-plus"></i>Ajouter Fermier</Link></li>
                            <li><Link to={`/Fermiers`}><i className="fa fa-list"></i>Lister Fermier</Link></li>
                            
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-building"></i>
							<span className="nav-text">Fermes</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterFermes`}><i className="fa fa-plus"></i>Ajouter Fermes</Link></li>
                            <li><Link to={`/Fermes`}><i className="fa fa-list"></i>Lister Fermes</Link></li>
                            <li><Link to={`/AffecterFermier`}><i className="fa fa-tasks"></i>Affecter Fermier</Link></li>
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-cubes"></i>
							<span className="nav-text">Stock</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterStock`}><i className="fa fa-plus"></i>Ajouter Stock</Link></li>
                            <li><Link to={`/Stocks`}><i className="fa fa-list"></i>Lister Stock</Link></li>
                            
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-layer-group"></i>
							<span className="nav-text">Catégorie-Stock</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterCategorieStock`}><i className="fa fa-plus"></i>Ajouter Catégorie-Stock</Link></li>
                            <li><Link to={`/CategorieStocks`}><i className="fa fa-list"></i>Lister Catégorie-Stock</Link></li>
                            
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-hat-cowboy-side"></i>
							<span className="nav-text">Vaches</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/Taches`}><i className="fa fa-plus"></i>Ajouter Vaches</Link></li>
                            <li><Link to={`/Taches`}><i className="fa fa-list"></i>Lister Vaches</Link></li>
                            
                        </ul>
                    </li>

                    <li><a className="has-arrow ai-icon "  aria-expanded="false">
                    <i className="fa fa-horse-head"></i>
							<span className="nav-text">Veaux</span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/Taches`}><i className="fa fa-plus"></i>Ajouter Veaux</Link></li>
                            <li><Link to={`/Taches`}><i className="fa fa-list"></i>Lister Veaux</Link></li>
                            
                        </ul>
                    </li>
                   
                    
                </ul>
				<div className="copyright">
					<p><strong>SIV - Admin Dashboard</strong> © 2021 All Rights Reserved</p>
				</div>
			</div>
        </div>   
        <Scripts/>
        </div>
    );

}