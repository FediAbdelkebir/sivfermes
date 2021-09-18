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
    Nom: "",
    Code: "",
    SUPAD: "",
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
  if((document.getElementById("NomVeaux").value=="")||(document.getElementById("CodeVeaux").value=="")||(document.getElementById("SUPAD").value=="")){
return false
  }
  else{
    return true
  }     
}
function GenerateCode(e){
  e.preventDefault();
        var uuid = require("uuid");
  var id = uuid.v4();
  document.getElementById("CodeVeaux").value=id;
  document.getElementById("PlaceholderVeauxCode").value=id;
  console.log(id)
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
        
        Veaux.Nom = document.getElementById("NomVeaux").value;
        Veaux.Code = document.getElementById("CodeVeaux").value;
        Veaux.SUPAD = document.getElementById("SUPAD").value;
        console.log({ Veaux });

        e.preventDefault();
        axios
          //.post("http://localhost:4000/veauxs/create", {
            .post("http://143.110.210.169:4000/veauxs/create", {
            Nom: Veaux.Nom,
            Code: Veaux.Code,
            SUPAD: Veaux.SUPAD,
          })
          .then((res) => {
            Swal.fire("Success", "Votre Veaux a été créé :) ", "success");
            console.log(res.data);
            history.push("/veauxs");
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
                <a href="javascript:void(0)">Ajouter Veaux</a>
              </li>
            </ol>
          </div>



          
          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label>Nom Veaux</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom Complet De la Veaux"
                      type="text"
                      id={"NomVeaux"}
                      name={"NomVeaux"}
                    />
                  </div>
                  
                  <div class="form-group col-md-3">
                                            <label>Code Veaux</label>
                                            <button className="btn btn-primary form-control" onClick={GenerateCode} id={"CodeVeaux"} name={"CodeVeaux"} ><i className="fa fa-plus-square"></i> GenerateCode </button>
                                            <input type="text" class="form-control" id={"PlaceholderVeauxCode"}/>
                                            </div>
                  
                  
                  <div className="form-group col-md-5">
              <label>Super Admin</label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"SUPAD"}
                      name={"SUPAD"}>
              {SelectList}
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
