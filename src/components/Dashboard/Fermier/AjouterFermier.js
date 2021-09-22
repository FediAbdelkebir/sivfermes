import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function AjouterFermier() {
  
  let history = useHistory();
  const [Fermier, setFermier] = useState({
    name: "",
    adress: "",
    birthdate:"",
    email:"",
    dateJoin:"",
    dateOff:"",
    image:""
  });
  const [users,setUsers]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    //axios.get("http://localhost:4000/users")
    axios.get("http://admin.laitespoir.com:8187/api/employees/list")
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
    setFermier({
      Fermier,
      [e.target.id]: e.target.value,
    });
  };
function Verif(){
  if((document.getElementById("nameFermier").value=="")||(document.getElementById("AdressFermier").value=="")||(document.getElementById("Email").value=="")||(document.getElementById("birthdate").value=="")||(document.getElementById("dateJoin").value=="")||(document.getElementById("dateOff").value=="")||(document.getElementById("image").value=="")){
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
        
        Fermier.name = document.getElementById("nameFermier").value;
        Fermier.adress = document.getElementById("AdressFermier").value;
        Fermier.email = document.getElementById("Email").value;
        Fermier.birthdate= document.getElementById("birthdate").value;
        Fermier.dateJoin=document.getElementById("dateJoin").value;
        Fermier.dateOff=document.getElementById("dateOff").value;
        Fermier.image=document.getElementById("image").value;
        console.log({ Fermier });

        e.preventDefault();
        axios
            .post("http://admin.laitespoir.com:8187/api/farms/save", {
            name: Fermier.name,
            adress: Fermier.adress,
            birthdate: Fermier.birthdate,
            email: Fermier.email,
            dateJoin:Fermier.dateJoin,
            dateOff:Fermier.dateOff,
            image:Fermier.image
            
          },{
            headers: {"Access-Control-Allow-Origin": "*"}
          })
          .then((res) => {
            Swal.fire("Success", "Votre Fermier a été créé :) ", "success");
            console.log(res.data);
            history.push("/fermiers");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une Fermier.", "error");
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
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Ajouter Fermier</strong></a></div>
              
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
                    />
                  </div>
                  
                  <div class="form-group col-md-3">
                                            <label><strong>Adress Fermier</strong></label>
                                            <input type="text" class="form-control" id={"AdressFermier"} name={"AdressFermier"}placeholder="Adress Complete De la Fermier"/>
                                            </div>
                  
                                            <div className="form-group col-md-2">
                    <label><strong>Date Naissance</strong></label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date Naissance"
                     
                      id={"birthdate"}
                      name={"birthdate"}
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
                     
                      id={"Password"}
                      name={"Password"}
                    />
            </div> 
                  </div>

                                        <br/>
                  
                
                
              </form>
              <button className="btn btn-primary" onClick={handleClick}>
              <strong><i className="fa fa-plus-square"></i> Ajouter Fermier</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
