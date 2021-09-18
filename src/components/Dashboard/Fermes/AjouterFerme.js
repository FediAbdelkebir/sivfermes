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
    numtel:"",
    manager:""
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
  if((document.getElementById("nameFerme").value=="")||(document.getElementById("AdressFerme").value=="")||(document.getElementById("Manager").value=="")||(document.getElementById("numtel").value=="")){
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
        Ferme.manager = document.getElementById("Manager").value;
        Ferme.description =document.getElementById("Descriptionferme").value;
        Ferme.numtel= document.getElementById("numtel").value;
        console.log({ Ferme });

        e.preventDefault();
        axios
            .post("http://localhost:8187/api/farms/save", {
            name: Ferme.name,
            adress: Ferme.adress,
            numtel: Ferme.numtel,
            manager: Ferme.manager,
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
                  
                                            <div className="form-group col-md-2">
                    <label><strong>Numero Téléphone</strong></label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Numero de Télephone"
                     
                      id={"numtel"}
                      name={"numtel"}
                    />
                  </div>
                  <div className="form-group col-md-4">
              <label><strong>Manager</strong></label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-4 " id={"Manager"}
                      name={"Manager"}>

              {SelectList}
</select>
            </div> 
            
                  <div class="form-group col-md-9" >
                                            <label><strong>Description detaillé de la ferme </strong></label>
                                        <textarea class="form-control" rows="5" id="comment" placeholder="Description sur la ferme.."
                                        id={"Descriptionferme"}
                                        name={"Descriptionferme"}
                                        ></textarea>
                                        </div>
                                        <br/>
                  
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
