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
    address: "",
    founding:"",
    numTel:"",
    description:"",
    createdAt:"",
    updatedAt:""
  });


function Verif(){
  if((document.getElementById("nameFerme").value=="")
  ||(document.getElementById("AdressFerme").value=="")
  ||(document.getElementById("numTel").value=="")
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
        Ferme.address = document.getElementById("AdressFerme").value;
        Ferme.numTel = document.getElementById("numTel").value;
        Ferme.description= document.getElementById("Descriptionferme").value;
        Ferme.createdAt="2021-09-26T20:02:33.598Z";
        Ferme.updatedAt="2021-09-26T20:02:33.598Z";
        Ferme.founding="2021-09-26T20:02:33.598Z";
        console.log({ Ferme });

        e.preventDefault();
        axios
            .post("http://admin.laitespoir.com:8187/api/farms/save", {
            name: Ferme.name,
            address: Ferme.address,
            description: Ferme.description,
            founding: Ferme.founding,
            numTel: Ferme.numTel,
            createdAt:  Ferme.createdAt,
            updatedAt:  Ferme.updatedAt,
            manager: 0,
            totalAnimals: 0
            
          },{
            headers: {"Access-Control-Allow-Origin": "*"}
          })
          .then((res) => {
            Swal.fire("Success", "Votre Ferme a été créé :) ", "success");
            console.log(res.data);
            history.push("/Fermes");
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
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Ajouter Ferme</strong></a></div>
              
              </li>
            </ol>
          </div>

          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label><strong>Nom Ferme</strong></label>
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
                                            <label><strong>Adress Ferme</strong></label>
                                            <input type="text" class="form-control" id={"AdressFerme"} name={"AdressFerme"}placeholder="Adress Complete De la Ferme"/>
                                            </div>
                  
                      
                  
                                            <div className="form-group col-md-3">
                    <label><strong>Numero Télephone</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Numero Télephone"
                     
                      id={"numTel"}
                      name={"numTel"}
                    />
                  </div>
                  <div class="form-group col-md-6" >
                                            <label><strong>Description detaillé de la Ferme </strong></label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Description sur la ferme.."
                                        id={"Descriptionferme"}
                                        name={"Descriptionferme"}
                                        ></textarea>
                                        </div>
                                      
                  
                </div>
                
              </form>
              <button className="btn btn-primary" onClick={handleClick}>
              <strong><i className="fa fa-plus-square"></i> Ajouter Ferme</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
