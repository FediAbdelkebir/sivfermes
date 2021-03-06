import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";

import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function ModifierFerme(props) {
  let history = useHistory();
const [isLoading, setIsLoading] = useState(true);
const [Fermes,setFermes]=useState({
  name: "",
  address: "",
  numTel:"",
  founding:"",
  description:""
});
const [Ferme, oldFerme] = useState({
  name: "",
  address: "",
  numTel:"",
  founding:"",
  description:""
});

useEffect(()=>{

  axios.get("http://admin.laitespoir.com:8187/api/farms/one/"+props.id)
  .then(res=>{
      setFermes(res.data);
      console.log(Fermes);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

  const handleClick = (e) => {

    Ferme.name = document.getElementById("nameFerme").value;
    Ferme.address = document.getElementById("AdressFerme").value;
    Ferme.numTel = document.getElementById("numTel").value;
    Ferme.description= document.getElementById("Descriptionferme").value;

    console.log({ Ferme });

    Swal.fire({
        
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Modifier`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Votre Ferme a été modifié :) ", "success");
        e.preventDefault();
        
        axios
            .put("http://admin.laitespoir.com:8187/api/farms/update/",{
              id:props.id,
            name: Ferme.name,
            address: Ferme.address,
            description: Ferme.description,
            numTel: Ferme.numTel,
          })
          .then((res) => {
            console.log(res.data);
            history.push("/Fermes");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de la Modification ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé la modification d'une Ferme.", "error");
      }
    });
  };

var ListModif=[];
ListModif.push(Fermes);

    const modifier = isLoading ?<div class="loader">
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
  </div> : ListModif.length ? (
        ListModif.map(Ferme=>{
          console.log(ListModif)
            return(
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
                            defaultValue={Ferme.name}
                          />
                        </div>
                        
                        <div class="form-group col-md-3">
                                                  <label><strong>Adress Ferme</strong></label>
                                                  <input type="text" class="form-control" id={"AdressFerme"} name={"AdressFerme"}placeholder="Adress Complete De la Ferme"
                                                  defaultValue={Ferme.address}/>
                                                  </div>
                      
                        
                                                  <div className="form-group col-md-3">
                    <label><strong>Numero Télephone</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Numero Télephone"
                      defaultValue={Ferme.numTel}
                      id={"numTel"}
                      name={"numTel"}
                    />
                  </div>
                        <div class="form-group col-md-6" >
                                                  <label><strong>Description detaillé de la Ferme </strong></label>
                                              <textarea class="form-control" rows="5" id="comment" placeholder="Description sur la ferme.."
                                              id={"Descriptionferme"}
                                              name={"Descriptionferme"}
                                              defaultValue={Ferme.description}
                                              ></textarea>
                                              </div>
                              
                        
                      </div>
                      
                    </form>
                    <button className="btn btn-primary" onClick={handleClick}>
                    <strong><i className="fa fa-plus-square"></i> Modifier Ferme</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )
        })
    ): <h3>Vide</h3>;

  return (
    <div Style="font-family: 'poppins', sans-serif;">
      <SideBar />
     {modifier}
    </div>
  );
}
