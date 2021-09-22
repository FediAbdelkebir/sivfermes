import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import $ from "jquery";
export default function AjouterVeaux() {
  let history = useHistory();
  const [Veaux, setVeaux] = useState({
    Nom:"Nom",
    birthday: "2021-09-18T13:14:36.136Z",
    dateajout:"2021-09-18T13:14:36.136Z",
    weight: 0,
    Fermier: "Fermier",
    gender: "string",
    matriculeAnimal: "string",
    originFather: "string",
    originMother: "string"
  });
  const [fermiers,setFermiers]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
useEffect(()=>{
  axios.get("http://localhost:8187/api/employees/list")
  .then(res=>{
    setFermiers(res.data);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);
$(document).ready(function () {       
  document.getElementById('dateajout').value = new Date().toDateInputValue();})
const FermiersList = isLoading ? <option>Chargements des fermiers ...</option> : fermiers.length ? (
  fermiers
      .map(user=>{
          return(
            <option selected>{user.name}</option>
          )
      })
  ): <h3>Aucun Fermier Trouvé !</h3>;
   
function Verif(){
  if((document.getElementById("Nom").value=="")
||(document.getElementById("birthday").value=="")
||(document.getElementById("dateajout").value=="")
||(document.getElementById("Fermier").value=="")
  ||(document.getElementById("weight").value=="")
  ||(document.getElementById("gender").value=="")
  ||(document.getElementById("matriculeAnimal").value=="")
  ||(document.getElementById("originFather").value=="") 
  ||(document.getElementById("originMother").value=="")){
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
        Veaux.Nom=document.getElementById("Nom").value;
        Veaux.birthday = document.getElementById("birthday").value;
        Veaux.dateajout=document.getElementById("dateajout").value;
        Veaux.weight = document.getElementById("weight").value;
        Veaux.gender = document.getElementById("gender").value;
        Veaux.matriculeAnimal = document.getElementById("matriculeAnimal").value;
        Veaux.originFather = document.getElementById("originFather").value;
        Veaux.originMother = document.getElementById("originMother").value;
        Veaux.Fermier=document.getElementById("Fermier").value;
        console.log({ Veaux });

        e.preventDefault();
        axios
          //.post("http://localhost:4000/veaux/create", {
            .post("http://localhost:8187/api/animals/Veaux/save", {
              Nom:  Veaux.Nom,
              birthday: Veaux.birthday,
              dateajout:Veaux.dateajout,
              weight: Veaux.weight,
              gender:Veaux.gender,
              matriculeAnimal: Veaux.matriculeAnimal,
              originFather: Veaux.originFather,
              originMother: Veaux.originMother,
              Fermier:Veaux.Fermier
              
              
          })
          .then((res) => {
            Swal.fire("Success", "Votre Veaux a été créé :) ", "success");
            console.log(res.data);
            history.push("/veaux");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une Veaux.", "error");
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a href="javascript:void(0)"><strong>Ajouter Veaux</strong></a>
              </li>
            </ol>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                 
                <div className="form-group col-md-3">
                    <label><strong>Nom Veaux : </strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom du veaux"
                 
                      id={"Nom"}
                      name={"Nom"}
                    />
                  </div>

                  <div className="form-group col-md-2">
                    <label><strong>Date Naissance :</strong> </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance de la Veaux"
           
                      id={"birthday"}
                      name={"birthday"}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label><strong>Date d'Ajout :</strong> </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date d'ajout de la Veaux"
           
                      id={"dateajout"}
                      name={"dateajout"}
                    />
                  </div>
                  
                  <div className="form-group col-md-2">
                    <label><strong>Poid : </strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Poid  de la veaux"
                 
                      id={"weight"}
                      name={"weight"}
                    />
                  </div>
                  <div className="form-group col-md-1">
                    <label><strong> Genre :</strong></label>
                    <select
                      className="form-control"
                
                      id={"gender"}
                      name={"gender"}
                    >
                      <option>M</option>
                      <option>F</option>
                    </select>
                  </div>
                  <div class="form-group col-md-3" >
                                            <label><strong>Matricule :</strong></label>
                                        <input type="text" class="form-control"  placeholder="Matricule de la Veaux.."
                                        id={"matriculeAnimal"}
                                        name={"matriculeAnimal"}
                                        ></input>
                                        </div>
                 
                    

                                        <br/>
                                

                                        <br/>
                <div className="form-group col-md-3">
                    <label><strong>Pére d'origine :</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pére d'origine De la Veaux"
                 
                      id={"originFather"}
                      name={"originFather"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label><strong>Mére d'origine :</strong></label>
                    <input
                      type="string"
                      className="form-control"
                      placeholder="Mére d'origine De la Veaux"
                 
                      id={"originMother"}
                      name={"originMother"}
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
              <i className="fa fa-plus-square"></i> Ajouter Veaux
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
