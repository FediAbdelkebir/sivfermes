import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";

import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function ModifierVeaux(props) {
  let history = useHistory();
const [Veaux, setVeauxs] = useState({
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
axios.get("http://admin.laitespoir.com:8187/api/users/list")
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
          <option selected>{user.username}</option>
        )
    })
): <h3>Aucun Fermier Trouvé !</h3>;
  
useEffect(()=>{
  //axios.get("http://localhost:4000/Veauxs/"+props.id)
  axios.get("http://admin.laitespoir.com:8187/api/animals/Veaux/one/"+props.id)
  .then(res=>{
      setVeauxs(res.data);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

  const handleClick = (e) => {
    Veaux.Nom = document.getElementById("NouveauNomVeaux").value;
    Veaux.Code = document.getElementById("NouveauCodeVeaux").value;
    Veaux.SUPAD = document.getElementById("NouveauSUPAD").value;
    console.log({ Veaux });

    Swal.fire({
        
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Modifier`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Votre Veaux a été modifié :) ", "success");
        e.preventDefault();
        
        axios
          //.put("http://localhost:4000/Veauxs/UpdateVeaux/"+props.id, {
            .put("http://143.110.210.169:4000/Veauxs/UpdateVeaux/"+props.id, {
            Nom: Veaux.Nom,
            Code: Veaux.Code,
            SUPAD: Veaux.SUPAD,
          })
          .then((res) => {
            console.log(res.data);
            history.push("/Veauxs");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de la Modification ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé la modification d'une Veaux.", "error");
      }
    });
  };


  var ListModif=[];
  ListModif.push(Veaux);
    const modifier = isLoading ?<div className="loader">
    <div className="dot">L</div>
    <div className="dot">O</div>
    <div className="dot">A</div>
    <div className="dot">D</div>
    <div className="dot">I</div>
    <div className="dot">N</div>
    <div className="dot">G</div>
    <div className="cogs">
      <div className="cog cog0">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="cog cog1">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="cog cog2">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  </div> : ListModif.length ? (
        ListModif.map(Veaux=>{
            return(
              <div className="content-body">
              <div className="container-fluid">
                <div className="page-titles">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a href="javascript:void(0)"><strong>Ajouter Veaux</strong></a>
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
                            defaultValue={Veaux.Nom}
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
                            defaultValue={Veaux.birthday}
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
                            defaultValue={Veaux.dateajout}
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
                            defaultValue={Veaux.originWeight}
                            id={"weight"}
                            name={"weight"}
                          />
                        </div>
                        <div className="form-group col-md-1">
                          <label><strong> Genre :</strong></label>
                          <select
                            className="form-control"
                            defaultValue={Veaux.gender}
                            id={"gender"}
                            name={"gender"}
                          >
                            <option>M</option>
                            <option>F</option>
                          </select>
                        </div>
                        <div className="form-group col-md-3" >
                                                  <label><strong>Matricule :</strong></label>
                                              <input type="text" className="form-control"  placeholder="Matricule de la Veaux.."
                                              id={"matriculeAnimal"}
                                              name={"matriculeAnimal"}
                                              defaultValue={Veaux.matriculeAnimal}
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
                            defaultValue={Veaux.originFather}
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
                            defaultValue={Veaux.originMother}
                            id={"originMother"}
                            name={"originMother"}
                          />
                        </div>
                        <div className="form-group col-md-2">
                    <label><strong>Choisire Fermier : </strong></label><br></br>
                    <select className="dropdown form-control  " id={"Fermier"}
                    defaultValue={Veaux.Fermier}
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
