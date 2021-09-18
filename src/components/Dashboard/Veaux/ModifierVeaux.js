import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";

import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function ModifierVeaux(props) {
  let history = useHistory();
const [isLoading, setIsLoading] = useState(true);
const [Veauxs,setVeauxs]=useState([]);
  const [Veaux, oldVeaux] = useState({
    Nom: "",
    Code: "",
    SUPAD: "",
  });
  const handleChange = (e) => {
    oldVeaux({
        Veaux,
      [e.target.id]: e.target.value,
    });
  };
  const [users,setUsers]=useState([]);
  
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
              
              <option selected >{user.name}</option>
            )
        })
    ): <h3>Aucun Utilisateur Trouvé !</h3>;

    function GenerateCode(e){
      e.preventDefault();
            var uuid = require("uuid");
      var id = uuid.v4();
      document.getElementById("NouveauCodeVeaux").value=id;
      document.getElementById("PlaceholderVeauxCode").value=id;
      console.log(id)
          }

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


    useEffect(()=>{
        //axios.get("http://localhost:4000/Veauxs/"+props.id)
        axios.get("http://143.110.210.169:4000/Veauxs/"+props.id)
        .then(res=>{
            setVeauxs(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);

    const modifier = isLoading ?<div class="loader">
    <div class="dot">L</div>
    <div class="dot">O</div>
    <div class="dot">A</div>
    <div class="dot">D</div>
    <div class="dot">I</div>
    <div class="dot">N</div>
    <div class="dot">G</div>
    <div class="cogs">
      <div class="cog cog0">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="cog cog1">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div class="cog cog2">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div> : Veauxs.length ? (
        Veauxs.map(Veaux=>{
            return(
                <div className="content-body"  key={Veaux._id}>
                <div className="container-fluid">
                  <div className="page-titles">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a><strong>Modifier Veaux</strong></a>
                      </li>
                    </ol>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form>
                        <div className="form-row">
                          <div className="form-group col-md-3">
                            <label>Nom Veaux :</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nouveau Nom Complet De la Veaux"
                              type="text"
                              id={"NouveauNomVeaux"}
                              name={"NouveauNomVeaux"}
                              defaultValue={Veaux.Nom}
                              onChange={handleChange}
                            />
                          </div>
                          <div class="form-group col-md-3">
                          <label>Génerer Automatiquement Code Tache :</label>
                          <button className="btn btn-primary form-control" onClick={GenerateCode} id={"NouveauCodeVeaux"} name={"NouveauCodeVeaux"} onChange={handleChange}><i className="fa fa-plus-square"></i> Génerer Code </button><br/>Génerer Manuellement :
                          <input type="text" class="form-control" id={"PlaceholderVeauxCode"}defaultValue={Veaux.Code}/>
                           </div>


                         
                          <div className="form-group col-md-5">
              <label>Super Admin :</label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"NouveauSUPAD"}
                      name={"NouveauSUPAD"}>
              {SelectList}
</select>
            </div> 
                        </div>
                      </form>
                      <button className="btn btn-primary" onClick={handleClick}>
                        Modifier Veaux
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
