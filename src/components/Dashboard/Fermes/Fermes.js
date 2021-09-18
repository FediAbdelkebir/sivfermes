import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import $ from 'jquery';


export default function Fermes() {
    const [isLoading, setIsLoading] = useState(true);
    const [fermes,setFermes]=useState([]);

    const handleChange = (e) => {
        var keyword = document.getElementById("ValeurRechercheFermes").value;
        if (keyword.length<1){
          console.log("Fergha");
          axios.get("http://localhost:8187/api/farms/list1")
        .then(res=>{
            setFermes(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
        }else{
        var filtered_ferme = fermes;

          filtered_ferme=fermes.filter(ferme=>ferme.name.toLowerCase().includes(keyword.toLowerCase()));
          setFermes(filtered_ferme);
        }
        
  }
  

    const deletesociete = (id) => {
      Swal.fire({
        title: "Vous etez sur?",
        text: "Veuillez Vérifier vos besoin avant de envoyé ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: `Oui, Supprimer`,
        denyButtonText: `Non, Annuler`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8187/api/farms/"+id);
         
          Swal.fire("Success", "Votre tache a été Modifié :) ", "success");
        } else {
          Swal.fire(
            "Annulé",
            "Vous Avez Annulé la suppresion de cette tache.",
            "error"
          );
        }
      });

      
    };
    

    useEffect(()=>{
    
        axios.get("http://localhost:8187/api/farms/list1")
        .then(res=>{
            setFermes(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);

function Trienom(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "name"));
}
function TrieManager(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "manager"));
}
function TrieNumtel(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "numTel"));
}

    const content = isLoading ? <div class="loader">
    <div class="dot">L</div>
    <div class="dot">O</div>
    <div class="dot">A</div>
    <div class="dot">D</div>
    <div class="dot">I</div>
    <div class="dot">N</div>
    <div class="dot">G</div>
    <div class="cogs">
      <div class="cog cog0">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="cog cog1">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="cog cog2">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div> : fermes.length ? (
        fermes
        .map(ferme=>{
            return(
                    <tr key={ferme.idFerme} id="RechercheFermes">
                <td>
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3" name={ferme.idFerme}>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={ferme.idFerme}
                      required=""
                      name={ferme.idFerme}
                    />
                    <label
                      className="custom-control-label"
                      for="customCheckBox2"
                    ></label>
                  </div>
                </td>
                
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="images/avatar/1.jpg"
                      className="rounded-lg mr-2"
                      alt=""
                      width="24"
                    />
                    <span className="w-space-no">{ferme.name}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="images/avatar/1.jpg"
                      className="rounded-lg mr-2"
                      alt=""
                      width="24"
                    />
                    <span className="w-space-no">{ferme.manager}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="images/avatar/1.jpg"
                      className="rounded-lg mr-2"
                      alt=""
                      width="24"
                    />
                    <span className="w-space-no">{ferme.numTel}</span>
                  </div>
                </td>
                
                
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/ModifierFerme/`+ferme.idFerme}
                      className="btn btn-primary shadow btn-xs sharp mr-1"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <a href="#" onClick={(e) =>deletesociete(ferme.idFerme, e)} className="btn btn-danger shadow btn-xs sharp">
                      <i className="fa fa-trash"></i>
                      </a>
                  </div>
                </td>
              </tr>
            )
        })
    ): <h3>Empty List !</h3>;
    return (
<div>
  <SideBar />
  <div className="content-body" Style="font-family: 'poppins', sans-serif;">
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> </a><strong>fermes</strong> 
          </li>
        </ol>
      </div>
      <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
        <div className="input-group search-area d-inline-flex">
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="flaticon-381-search-2"></i>
            </span>
          </div>
          <input type="text" className="form-control" placeholder="Search here" id="ValeurRechercheFermes" onChange={handleChange}/>&nbsp;

        </div>
        

 
        <Link to={`/AjouterFermes`} className="btn btn-primary ml-auto"><i className="fa fa-plus-circle"></i> Ajouter fermes</Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-responsive-md">
            <thead>
            <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkAll"
                      required=""
                    />
                    <label className="custom-control-label" for="checkAll"></label>
                  </div>
                </th>
                
                <th>
                <a href="#" className="btn btn-primary ml-auto" onClick={Trienom}><i className="fa fa-sort"></i></a>
                </th>
                
                <th>
                <a href="#" className="btn btn-primary ml-auto" onClick={TrieManager}><i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-primary ml-auto" onClick={TrieNumtel}><i className="fa fa-sort"></i></a>
                </th>
                <th>
                  <strong></strong>
                </th>
              </tr>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkAll"
                      required=""
                    />
                    <label className="custom-control-label" for="checkAll"></label>
                  </div>
                </th>
                
                <th>
                  <strong>Nom Sociéte</strong>
                </th>
                
                <th>
                  <strong>Manager</strong>
                </th>
                <th>
                  <strong>Numero Télephone</strong>
                </th>
                <th>
                  <strong>Gestion</strong>
                </th>
              </tr>
            </thead>
              {content}
             
          </table>
        </div>
      </div>
      <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
        <div className="input-group search-area d-inline-flex">
          <div className="input-group-append">
          </div>
        </div>
        
      </div>

    </div>
  </div>

</div>


    );}