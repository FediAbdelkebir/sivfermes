import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import '../../css/Card.css';
import SideBar from '../SideBar';
import Swal from "sweetalert2";

export default function AjouterFermier() {
    const [isLoading, setIsLoading] = useState(true);
    const [fermiers,setFermiers]=useState([]);
    const [Farms,setFarms]=useState([]);

    useEffect(()=>{
        axios.get("http://admin.laitespoir.com:8187/api/farms/list")
        .then(res=>{
            console.log(res);
            setFarms(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);

    useEffect(()=>{
        axios.get("http://admin.laitespoir.com:8187/api/Societe/list")
        .then(res=>{
          setFermiers(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);
    const FarmsList = isLoading ? <option>Chargements des Farms ...</option> : Farms.length ? (
      Farms
          .map(farms=>{
              return(
                <option selected value={farms.id}>{farms.name}</option>
              )
          })
      ): <h3>Aucun Fermier Trouvé !</h3>;
      const FermiersList = isLoading ? <option>Chargements des fermiers ...</option> : fermiers.length ? (
        fermiers
            .map(user=>{
                return(
                  <option selected value={user.id}>{user.name}</option>
                )
            })
        ): <h3>Aucun Fermier Trouvé !</h3>;
function handleajout(){
  var Fermier=document.getElementById("Fermier").value;;
  var Societé=document.getElementById("Farm").value;;
  console.log(Fermier)
  console.log(Societé)

    Swal.fire({
        title: "Vous etez sur?",
        text: "Veuillez Vérifier vos besoin avant de envoyé ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: `Ajouter`,
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Success", "Votre fermier a été créé :) ", "success");
          console.log(Fermier,Societé);
          axios
            .post("http://admin.laitespoir.com:8187/api/Societe/affect/"+Societé+"/"+Fermier, {
              idSociete: Societé,
              idFerme: Fermier,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              Swal.fire("Ooops", "Une Erreur au niveau de l'ajout' ", "error");
              console.error(err);
            });
        } else {
          Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une fermier.", "error");
        }
      });
}

    return (
      <div Style="font-family: 'poppins', sans-serif;">
      <SideBar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Affecter Des Farms</strong></a></div>
              
              </li>
            </ol>
          </div>

          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">

                  <div className="form-group col-md-6">
              <label><strong>Choisire Société : </strong></label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-6 " 
              id={"Fermier"}
              name={"Fermier"}>

              {FermiersList}
</select>
            </div> 
            <div className="form-group col-md-6">
              <label><strong>Choisire Farms :</strong></label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-6 " id={"Farm"}
                      name={"Farm"}>
 {FarmsList}
            
</select>
            </div>
              
                  
                </div>
                
              </form>
              <button className="btn btn-primary" onClick={handleajout}>
              <strong><i className="fa fa-plus-square"></i> Affecter Farm</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
}