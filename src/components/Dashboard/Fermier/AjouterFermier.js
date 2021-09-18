import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import Swal from "sweetalert2";
export default function Ajouterfermier({history}) {
    const [fermier, setFermier] = useState({
        Nom: "",
        Code: "",
        Description: "",
        Etat:"",
        Responsable:"",
        Points:"",
      });
      const handleChange = (e) => {
        setFermier({
            fermier,
          [e.target.id]: e.target.value,
        });
      };
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
    function Verif(){
      if ((document.getElementById("Nomfermier").value=="")||(document.getElementById("Codefermier").value=="")||
      (document.getElementById("Descriptionfermier").value=="")||(document.getElementById("Pointsfermier").value=="")){
        return false;
      }else{
        return true;
      }

    };
    function GenerateCode(e){
e.preventDefault();
      var uuid = require("uuid");
var id = uuid.v4();
document.getElementById("Codefermier").value=id;
document.getElementById("Placeholder").value=id;
console.log(id)
    }
      const handleClick = (e) => {
        if (Verif()){
        Swal.fire({
          title: "Vous etez sur?",
          text: "Veuillez Vérifier vos besoin avant de envoyé ",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: `Ajouter`,
          denyButtonText: `Non`,
        }).then((result) => {
          if (result.isConfirmed) {
            
            fermier.Nom = document.getElementById("Nomfermier").value;
            fermier.Code = document.getElementById("Codefermier").value;
            fermier.Description = document.getElementById("Descriptionfermier").value;
            fermier.Etat = "En Cours";
            fermier.Points = document.getElementById("Pointsfermier").value;
            fermier.Responsable = document.getElementById("Responsablefermier").value;;
            console.log({ fermier });
    
            e.preventDefault();
            axios
              //.post("http://localhost:4000/fermiers/createfermier", {
                .post("/api/employees/save", {
                Nom: fermier.Nom,
                Code: fermier.Code,
                Description: fermier.Description,
                Etat: fermier.Etat,
                Points:fermier.Points,
                Responsable:fermier.Responsable,
              })
              .then((res) => {
                Swal.fire("Success", "Votre fermier a été créé :) ", "success");
                console.log(res.data);
                history.push("/fermiers");
              })
              .catch((err) => {
                Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
                console.error(err);
              });
          } else {
            Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une fermier.", "error");
          }
        });
      }else{
        Swal.fire("Erreur", "Veuillez remplire tous les champs", "error");
      }
      };

    return (
<div Style="font-family: 'poppins', sans-serif;">
  <SideBar />
  <div class="content-body">
    <div class="container-fluid">
      <div class="page-titles">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Ajouter fermiers</a>
          </li>
        </ol>
      </div>
      <div class="card-body">
                                <div class="basic-form">
                                    <form>

                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label>Nom fermier</label>
                                                <input type="text" class="form-control" placeholder="Nom Complet De la fermier"
                                                                      id={"Nomfermier"}
                                                                      name={"Nomfermier"}
                                                />
                                            </div>
                                            
                                            <div class="form-group col-md-3">
                                            <label>Code fermier</label>
                                            <button className="btn btn-primary form-control" onClick={GenerateCode} id={"Codefermier"} name={"Codefermier"} ><i className="fa fa-plus-square"></i> GenerateCode </button>
                                            <input type="text" class="form-control" id={"Placeholder"}readOnly="true"/>
                                            </div>
                                            <div class="form-group col-md-2">
                                            <label>Nombre de Points </label>
                                            <input type="text" class="form-control"
                                             id={"Pointsfermier"}
                                             name={"Pointsfermier"}
                                             placeholder="Nombre de points"
                                            />
                                            </div>
                                            <div className="form-group col-md-5">
              <label>Responsable </label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Responsablefermier"}
                      name={"Responsablefermier"}>
              {SelectList}
</select>
            </div>
                                            
                                            
                                            <div class="form-group col-md-9" >
                                            <label>Description detaillé de la fermier </label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Description sur la fermier.."
                                        id={"Descriptionfermier"}
                                        name={"Descriptionfermier"}
                                        ></textarea>
                                        </div>
                                        
                                        </div>

                                        <div class="form-group">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"/>
                                                <label class="form-check-label">
                                                    Send Mail 
                                                </label>
                                            </div>
                                        </div>
                                        
                                        
                                    </form>
                                    <button className="btn btn-primary" onClick={handleClick}><i className="fa fa-plus-square"></i> Ajouter fermier</button>
                                    
                                </div>
                            </div>
    </div>
  </div>
 
</div>

      
    );
}