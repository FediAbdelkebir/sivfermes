import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import $ from 'jquery';
import Cookies from 'universal-cookie';


export default function Fermes() {
    const [isLoading, setIsLoading] = useState(true);
    const [fermes,setFermes]=useState([]);
    useEffect(()=>{/*
      $.ajax({
        url: "http://admin.laitespoir.com:8187/api/societe/list",
        type: 'GET',
        crossDomain: true,
        headers: {
    "Authorization": "Basic YWRtaW46cGFzcw=="
  },
        dataType: 'JSON',
        xhrFields: {
        withCredentials: true
        },
        success: function(res) {
          setFermes(res.data);
            console.log(res);
        }
    });
    */
     // axios.get("http://admin.laitespoir.com:8187/api/societe/list",{
        /*headers: {
          
        'Access-Control-Allow-Origin': 'http://admin.laitespoir.com:8187/',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods':'*',
        Accept: 'application/json',
        Authorization: 'JSESSION '+"2A4894E5F79458AEED914346398CA8D3",
        'Connection':'keep-alive',
        'Content-Type': 'application/json',},*/
       /* auth: {
          username: 'admin',
          password: 'pass'
        }
      })
      .then(res=>{
        console.log(res.data)
          setFermes(res.data);
          setIsLoading(false);
      })
      .catch(err=>{
        Swal.fire("Ooops", "Une Erreur au niveau de la Recuperation de la Liste", "error");
    console.log(err)})
*/

/*
var settings = {
  "url": "http://admin.laitespoir.com:8187/api/societe/list",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Basic YWRtaW46cGFzcw=="
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
*/

/*
var myHeaders = new Headers();
//myHeaders.append("Authorization", "Basic YWRtaW46cGFzcw==");
myHeaders.set('Authorization', 'Basic YWRtaW46cGFzcw==');
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://admin.laitespoir.com:8187/api/societe/list", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


  */
  }, []);
  
    const handleChange = (e) => {
        var keyword = document.getElementById("ValeurRechercheFermes").value;
        if (keyword.length<1){
          console.log("Fergha");
          axios.get("http://admin.laitespoir.com:8187/api/societe/list")
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
  

    const deletesociete = (ferme) => {
      Swal.fire({
        title: "Vous etez sur?",
        text: "Veuillez Vérifier vos besoin avant de envoyé ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: `Oui, Supprimer`,
        denyButtonText: `Non, Annuler`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://admin.laitespoir.com:8187/api/societe/delete", {
            idFerme:ferme.idFerme,
           name: ferme.name,
           address: ferme.adress,
           matriculeFiscal: ferme.matriculeFiscal,
           email: ferme.email,
           //password: Ferme.password,
           //images:"image",
          // status:1,
           createdAt:  ferme.createdAt,
           dateCreationSociete:  ferme.dateCreationSociete,
         });
         
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
    


function Trienom(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "name"));
}
function TrieAdress(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "address"));
}
function TrieEmail(e){
    e.preventDefault();
  setFermes(sortBy(fermes, "email"));
}
function TrieDescription(e){
  e.preventDefault();
setFermes(sortBy(fermes, "matriculeFiscal"));
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
                    <span className="w-space-no">{ferme.address}</span>
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
                    <span className="w-space-no">{ferme.email}</span>
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
                    <span className="w-space-no">{ferme.matriculeFiscal}</span>
                  </div>
                </td>
                
                
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/ModifierFerme/`+ferme.id}
                      className="btn btn-primary shadow btn-xs sharp mr-1"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <a href="#" onClick={(e) =>deletesociete(ferme, e)} className="btn btn-danger shadow btn-xs sharp">
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
        

 
        <Link to={`/AjouterSociétés`} className="btn btn-primary ml-auto"><i className="fa fa-plus-circle"></i> Ajouter Sociétés</Link>
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
                <a href="#" className="btn btn-primary ml-auto" onClick={TrieAdress}><i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-primary ml-auto" onClick={TrieEmail}><i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-primary ml-auto" onClick={TrieDescription}><i className="fa fa-sort"></i></a>
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
                  <strong>Nom</strong>
                </th>
                
                <th>
                  <strong>Adress</strong>
                </th>
                <th>
                  <strong>E-mail</strong>
                </th>
                <th>
                  <strong>Matricule</strong>
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