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
const [Fermier, setFermier] = useState({
  username: "",
  adress: "",
  birthdate:"",
  email:"",
  Password:""
});

useEffect(()=>{

  axios.get("http://admin.laitespoir.com:8187/api/users/one/"+props.id)
  .then(res=>{
      setFermier(res.data);
      console.log(Fermier);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

function Verif(){
  if((document.getElementById("nameFermier").value=="")
  ||(document.getElementById("AdressFermier").value=="")
  ||(document.getElementById("Email").value=="")
  ||(document.getElementById("birthdate").value=="")){
return false
  }
  else{
    return true
  }     
}

const handleClick = (e) => {
  if(Verif()){
  Swal.fire({
    title: "Vous etez sur?",
    text: "Veuillez Vérifier vos besoin avant de envoyé ",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: `Modifier`,
    denyButtonText: `Non`,
  }).then((result) => {
    if (result.isConfirmed) {
      
      Fermier.username = document.getElementById("nameFermier").value;
      Fermier.adress = document.getElementById("AdressFermier").value;
      Fermier.email = document.getElementById("Email").value;
      Fermier.birthdate= document.getElementById("birthdate").value;
      Fermier.Password=document.getElementById("Password").value;
      console.log({ Fermier });

      e.preventDefault();
      axios
          .put("http://admin.laitespoir.com:8187/api/users/update/", {
          username: Fermier.username,
          adress: Fermier.adress,
          birthdate: Fermier.birthdate,
          email: Fermier.email,
          password:Fermier.Password,
          createdAt: "2021-09-22T18:10:36.269Z"
        },{
          headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then((res) => {
          Swal.fire("Success", "Votre Fermier a été Modifié :) ", "success");
          console.log(res.data);
          history.push("/fermiers");
        })
        .catch((err) => {
          Swal.fire("Ooops", "Une Erreur au niveau de la Modification ", "error");
          console.error(err);
        });
    } else {
      Swal.fire("Annulé", "Vous Avez Annulé la Modefication du Fermier.", "error");
    }
  });
}else{
  Swal.fire("Erreur", "Veuillez remplire tous les champs .", "error");
}
};

var ListModif=[];
ListModif.push(Fermier);

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
        ListModif.map(Fermier=>{
          console.log(ListModif)
            return(
              <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Modifier Fermier</strong></a></div>
              
              </li>
            </ol>
          </div>

          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label><strong>Nom Fermier</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom Complet De la Fermier"
                      type="text"
                      id={"nameFermier"}
                      name={"nameFermier"}
                      defaultValue={Fermier.username}
                    />
                  </div>
                  
                  <div class="form-group col-md-3">
                                            <label><strong>Adress Fermier</strong></label>
                                            <input type="text" class="form-control" id={"AdressFermier"} name={"AdressFermier"}placeholder="Adress Complete De la Fermier"
                                             defaultValue={Fermier.adress}/>
                                            </div>
                  
                                            <div className="form-group col-md-2">
                    <label><strong>Date Naissance</strong></label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance"
                     
                      id={"birthdate"}
                      name={"birthdate"}
                      defaultValue={Fermier.birthdate}
                    />
                  </div>
                  </div>
                  <div className="form-row">
                  <div className="form-group col-md-3">
              <label><strong>Email :</strong></label><br></br>
              <input
                      type="email"
                      className="form-control"
                      placeholder="Adress E-mail"
                      defaultValue={Fermier.email}
                      id={"Email"}
                      name={"Email"}
                    />
            </div> 
            <div className="form-group col-md-3">
              <label><strong>Mot De Pass :</strong></label><br></br>
              <input
                      type="password"
                      className="form-control"
                      placeholder="Mot de Pass du Compte"
                      defaultValue={Fermier.Password}
                      id={"Password"}
                      name={"Password"}
                    />
            </div> 
                  </div>
                                        <br/>
              </form>
              <button className="btn btn-primary" onClick={handleClick}>
              <strong><i className="fa fa-plus-square"></i> Modifier Fermier</strong>
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
