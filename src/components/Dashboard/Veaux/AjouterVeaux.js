import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function AjouterVeaux() {
  let history = useHistory();
  const [Veaux, setVeaux] = useState({
    animalsType: "string",
    birthday: "2021-09-18T13:14:36.136Z",
    bornStatus: 0,
    born_weight: 0,
    description: "string",
    gender: "string",
    images: "string",
    matriculeAnimal: "string",
    originFather: "string",
    originMother: "string",
    originWeight: 0,
    receiveWeight: 0,
  });
  const [users,setUsers]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    //axios.get("http://localhost:4000/users")
    axios.get("http://143.110.210.169:4000/users")
    .then(res=>{
        setUsers(res.data);
        setIsLoading(false);
    })
    .catch(err=>console.log)
}, []);

   const SelectList = isLoading ? <option>Chargements des utilisateurs ...</option> : users.length ? (
    users
        .map(user=>{
            return(
              <option selected>{user.name}</option>
            )
        })
    ): <h3>Aucun Utilisateur Trouvé !</h3>;
  const handleChange = (e) => {
    setVeaux({
      Veaux,
      [e.target.id]: e.target.value,
    });
  };
function Verif(){
  if((document.getElementById("animalsType").value=="")
||(document.getElementById("birthday").value=="")
  ||(document.getElementById("bornStatus").value=="")
  ||(document.getElementById("born_weight").value=="")
  ||(document.getElementById("description").value=="")
  ||(document.getElementById("gender").value=="")
  ||(document.getElementById("images").value=="")
  ||(document.getElementById("matriculeAnimal").value=="")
  ||(document.getElementById("originFather").value=="") 
  ||(document.getElementById("originMother").value=="")
  ||(document.getElementById("receiveWeight").value=="")){
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
        
        Veaux.animalsType = document.getElementById("animalsType").value;
        Veaux.birthday = document.getElementById("birthday").value;
        Veaux.bornStatus = document.getElementById("bornStatus").value;
        Veaux.born_weight = document.getElementById("born_weight").value;
        Veaux.description = document.getElementById("description").value;
        Veaux.gender = document.getElementById("gender").value;
        Veaux.images = document.getElementById("images").value;
        Veaux.matriculeAnimal = document.getElementById("matriculeAnimal").value;
        Veaux.originFather = document.getElementById("originFather").value;
        Veaux.originMother = document.getElementById("originMother").value;
        Veaux.originWeight = document.getElementById("originWeight").value;
        Veaux.receiveWeight = document.getElementById("receiveWeight").value;
        console.log({ Veaux });

        e.preventDefault();
        axios
          //.post("http://localhost:4000/veaux/create", {
            .post("http://localhost:8187/api/animals/Veaux/save", {
              animalsType:  Veaux.animalsType,
              birthday: Veaux.birthday,
              bornStatus:  Veaux.bornStatus,
              born_weight: Veaux.born_weight,
              description: Veaux.description,
              gender:Veaux.gender,
              images: Veaux.images,
              matriculeAnimal: Veaux.matriculeAnimal,
              originFather: Veaux.originFather,
              originMother: Veaux.originMother,
              originWeight: Veaux.originWeight,
              receiveWeight: Veaux.receiveWeight,
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
                    <label><strong>Annimal Type :</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type de la Veaux"
                      type="text"
                      id={"animalsType"}
                      name={"animalsType"}
                    />
                  </div>

                  <div className="form-group col-md-3">
                    <label><strong>Date Naissance :</strong> </label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance de la Veaux"
           
                      id={"birthday"}
                      name={"birthday"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label><strong>Status Naissance :</strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Status de naissance de la veaux"
             
                      id={"bornStatus"}
                      name={"bornStatus"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label><strong>Poid de naissance : </strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Poid naissance de la veaux"
                 
                      id={"born_weight"}
                      name={"born_weight"}
                    />
                  </div>
                  <div className="form-group col-md-3">
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
                  <div class="basic-form custom_file_input col-md-3">
                  <div class="form-group mb-3">
                  <label><strong>Choisire Image :</strong></label>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id={"images"}/>
                                                <label class="custom-file-label">Veuillez Choisire une Image</label>
                                            </div>
                                        </div>
                    </div>
                    <div class="form-group col-md-9" >
                                            <label><strong>Matricule :</strong></label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Matricule de la Veaux.."
                                        id={"matriculeAnimal"}
                                        name={"matriculeAnimal"}
                                        ></textarea>
                                        </div>

                                        <br/>
                                        <div class="form-group col-md-9" >
                                            <label><strong>Description Detaillé :</strong></label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Description Detaillé de la Veaux.."
                                        id={"description"}
                                        name={"description"}
                                        ></textarea>
                                        </div>

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
                  <div className="form-group col-md-3">
                    <label><strong>Poid d'origine :</strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Poid Complet De la Veaux"
                 
                      id={"originWeight"}
                      name={"originWeight"}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label><strong>Poid Recu :</strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Poid Recu De la veaux "
                 
                      id={"receiveWeight"}
                      name={"receiveWeight"}
                    />
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
