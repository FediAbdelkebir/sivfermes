import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import $ from "jquery";
export default function AjouterFerme() {
  let history = useHistory();
  const [Ferme, setFerme] = useState({
    name: "",
    adress: "",
    email:"",
    password:"",
    matriculeFiscal:"",
    createdAt:"",
    dateCreationSociete:""
  });


function Verif(){
  if((document.getElementById("nameFerme").value=="")
  ||(document.getElementById("AdressFerme").value=="")
  ||(document.getElementById("Password").value=="")
  ||(document.getElementById("Email").value=="")
  ||(document.getElementById("Descriptionferme").value=="")){
return false
  }
  else{
    return true
  }     
}
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const handleClick = (e) => {
    if(Verif()){
    Swal.fire({
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Ajouter`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        Ferme.name = document.getElementById("nameFerme").value;
        Ferme.adress = document.getElementById("AdressFerme").value;
        Ferme.password = document.getElementById("Password").value;
        Ferme.email= document.getElementById("Email").value;
        Ferme.matriculeFiscal= document.getElementById("Descriptionferme").value;
        Ferme.createdAt=date;
        Ferme.dateCreationSociete=date;
        console.log({ Ferme });

        e.preventDefault();
        axios
            .post("http://admin.laitespoir.com:8187/api/Societe/save", {
             // idFerme:5,
            name: Ferme.name,
            address: Ferme.adress,
            matriculeFiscal: Ferme.matriculeFiscal,
            email: Ferme.email,
            //password: Ferme.password,
            //images:"image",
           // status:1,
            createdAt:  Ferme.createdAt,
            dateCreationSociete:  Ferme.dateCreationSociete,
            
          },{
            headers: {"Access-Control-Allow-Origin": "*"}
          })
          .then((res) => {
            Swal.fire("Success", "Votre Ferme a été créé :) ", "success");
            console.log(res.data);
            history.push("/Sociétés");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une Ferme.", "error");
      }
    });
  }else{
    Swal.fire("Erreur", "Veuillez remplire tous les champs .", "error");
  }
  };
  
  return (
    <div Style="font-family: 'poppins', sans-serif;">
      <SideBar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Ajouter Société</strong></a></div>
              
              </li>
            </ol>
          </div>

          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label><strong>Nom Société</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom Complet De la Ferme"
                      type="text"
                      id={"nameFerme"}
                      name={"nameFerme"}
                    />
                  </div>
                  
                  <div class="form-group col-md-3">
                                            <label><strong>Adress Société</strong></label>
                                            <input type="text" class="form-control" id={"AdressFerme"} name={"AdressFerme"}placeholder="Adress Complete De la Société"/>
                                            </div>
                  
                                            <div className="form-group col-md-3">
                    <label><strong>E-mail Société</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address Email Société"
                     
                      id={"Email"}
                      name={"Email"}
                    />
                  </div>
                  
 
                  <div class="form-group col-md-6" >
                                            <label><strong>Description detaillé de la Société </strong></label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Description sur la ferme.."
                                        id={"Descriptionferme"}
                                        name={"Descriptionferme"}
                                        ></textarea>
                                        </div>
                                        <div className="form-group col-md-3">
                    <label><strong>Mot de Pass</strong></label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de Pass Société"
                     
                      id={"Password"}
                      name={"Password"}
                    />
                  </div>
                  
                </div>
                
              </form>
              <button className="btn btn-primary" onClick={handleClick}>
              <strong><i className="fa fa-plus-square"></i> Ajouter Société</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
