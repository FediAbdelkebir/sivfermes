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
                    <i className="fa fa-building" Style="color:#0d6efd;"></i>
							<span className="nav-text" Style="color:black;"><strong>Farm</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterFermes`}><i className="fa fa-plus" Style="color:#0d6efd;"></i>Ajouter Fermes</Link></li>
                            <li><Link to={`/Fermes`}><i className="fa fa-list" Style="color:#0d6efd;"></i>Lister Fermes</Link></li>
                            <li><Link to={`/AffecterFermier`}><i className="fa fa-tasks" Style="color:#0d6efd;"></i>Affecter Fermier</Link></li>
                        </ul>
                    </li>
                    
                <li><a className="has-arrow ai-icon"  aria-expanded="false">
                <i className="fa fa-user" Style="color:#f06a53;"></i>
							<span className="nav-text" Style="color:black;"><strong>Fermier</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterFermier`}><i className="fa fa-plus" Style="color:#f06a53;"></i>Ajouter Fermier</Link></li>
                            <li><Link to={`/Fermiers`}><i className="fa fa-list" Style="color:#f06a53;"></i>Lister Fermier</Link></li>
                            
                        </ul>
                    </li>
                   
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-cubes" Style="color:#6c1d27;"></i>
							<span className="nav-text" Style="color:black;"><strong>Stock</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterStock`}><i className="fa fa-plus" Style="color:#6c1d27;"></i>Ajouter Stock</Link></li>
                            <li><Link to={`/Stocks`}><i className="fa fa-list" Style="color:#6c1d27;"></i>Lister Stock</Link></li>
                            
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-group" Style="color:#c4583b;"></i>
							<span className="nav-text" Style="color:black;"><strong>Catégorie-Stock</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterCategorieStock`}><i className="fa fa-plus" Style="color:#c4583b;"></i>Ajouter Catégorie-Stock</Link></li>
                            <li><Link to={`/CategorieStocks`}><i className="fa fa-list" Style="color:#c4583b;"></i>Lister Catégorie-Stock</Link></li>
                            
                        </ul>
                    </li>
                    <li><a className="has-arrow ai-icon"  aria-expanded="false">
                    <i className="fa fa-paw" Style="color:#6418c3;"></i>
							<span className="nav-text" Style="color:black;"><strong>Vaches</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterVache`}><i className="fa fa-plus" Style="color:#6418c3;"></i>Ajouter Vaches</Link></li>
                            <li><Link to={`/Vaches`}><i className="fa fa-list" Style="color:#6418c3;"></i>Lister Vaches</Link></li>
                            
                        </ul>
                    </li>

                    <li><a className="has-arrow ai-icon "  aria-expanded="false">
                    <i className="fa fa-paw" Style="color:#dc3ccc;"></i>
							<span className="nav-text" Style="color:black;"><strong>Veaux</strong></span>
						</a>
                        <ul aria-expanded="false">
                            <li><Link to={`/AjouterVeaux`}><i className="fa fa-plus" Style="color:#dc3ccc;"></i>Ajouter Veaux</Link></li>
                            <li><Link to={`/Veaux`}><i className="fa fa-list" Style="color:#dc3ccc;"></i>Lister Veaux</Link></li>
                            
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