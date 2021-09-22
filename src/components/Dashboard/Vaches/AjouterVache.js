import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import $ from "jquery";
export default function AjouterVache() {
 


  let history = useHistory();
  const [Vache, setVache] = useState({
    birthday: "",
    Matricule: "",
    dateajout:"",
    Fermier:""

  });
  const [fermiers,setFermiers]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
useEffect(()=>{
  axios.get("http://admin.laitespoir.com:8187/api/employees/list")
  .then(res=>{
    setFermiers(res.data);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

const FermiersList = isLoading ? <option>Chargements des fermiers ...</option> : fermiers.length ? (
  fermiers
      .map(user=>{
          return(
            <option selected>{user.name}</option>
          )
      })
  ): <h3>Aucun Fermier Trouvé !</h3>;
function Verif(){
  if((document.getElementById("birthday").value=="")
  ||(document.getElementById("Matricule").value=="")
  ||(document.getElementById("dateajout").value=="")
  ||(document.getElementById("Fermier").value=="")){
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
      confirmButtonText: `Ajouter`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        Vache.animalsType = document.getElementById("animalsType").value;
        console.log({ Vache });

        e.preventDefault();
        axios
          //.post("http://localhost:4000/vaches/create", {
            .post("http://admin.laitespoir.com:8187/api/animals/Vaches/save", {
              birthday:Vache.birthday,
              dateajout:Vache.dateajout,
              Matricule:Vache.Matricule,
              Fermier:Vache.Fermier

          })
          .then((res) => {
            Swal.fire("Success", "Votre Vache a été créé :) ", "success");
            console.log(res.data);
            history.push("/vaches");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une Vache.", "error");
      }
    });
  }else{
    Swal.fire("Erreur", "Veuillez remplire tous les champs .", "error");
  }
  };
  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
$(document).ready(function () {     
    
  document.getElementById('dateajout').value = new Date().toDateInputValue();})
  return (
    
    <div Style="font-family: 'poppins', sans-serif;">
      <SideBar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a href="javascript:void(0)"><strong>Ajouter Vache</strong></a>
              </li>
            </ol>
          </div>



          
          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                  

                  <div className="form-group col-md-2">
                    <label><strong>Date Naissance :</strong> </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance de la Vache"
           
                      id={"birthday"}
                      name={"birthday"}
                    />
                  </div>
                  
                  <div className="form-group col-md-2">
                    <label><strong>Date d'Ajout :</strong> </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance de la Vache"
           
                      id={"dateajout"}
                      name={"dateajout"}
                    
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label><strong>Matricule Vache :</strong> </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Date Naissance de la Vache"
           
                      id={"Matricule"}
                      name={"Matricule"}
                    />
                  </div>
                  <div className="form-group col-md-2">
              <label><strong>Choisire Fermier : </strong></label><br></br>
              <select class="dropdown form-control  " id={"Fermier"}
                      name={"Fermier"}>

              {FermiersList}
</select>
            
            </div>
                  </div>
                 
                
                
              </form>
              <button className="btn btn-primary" onClick={handleClick}>
              <i className="fa fa-plus-square"></i> Ajouter Vache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
