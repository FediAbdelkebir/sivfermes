import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function AjouterFerme() {
  let history = useHistory();
  const [Ferme, setFerme] = useState({
    name: "",
    adress: "",
    description: "",
    Email:"",
    password:""
  });
  const [users,setUsers]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    //axios.get("http://localhost:4000/users")
    axios.get("http://localhost:8187/api/employees/list")
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
    setFerme({
      Ferme,
      [e.target.id]: e.target.value,
    });
  };
function Verif(){
  if((document.getElementById("nameFerme").value=="")||(document.getElementById("AdressFerme").value=="")||(document.getElementById("Password").value=="")||(document.getElementById("Email").value=="")){
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
        
        Ferme.name = document.getElementById("nameFerme").value;
        Ferme.adress = document.getElementById("AdressFerme").value;
        Ferme.password = document.getElementById("Password").value;
        Ferme.description =document.getElementById("Descriptionferme").value;
        Ferme.Email= document.getElementById("Email").value;
        console.log({ Ferme });

        e.preventDefault();
        axios
            .post("http://localhost:8187/api/farms/save", {
            name: Ferme.name,
            adress: Ferme.adress,
            Email: Ferme.Email,
            password: Ferme.password,
            description: Ferme.description,
            
          },{
            headers: {"Access-Control-Allow-Origin": "*"}
          })
          .then((res) => {
            Swal.fire("Success", "Votre Ferme a été créé :) ", "success");
            console.log(res.data);
            history.push("/fermes");
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
