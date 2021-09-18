import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";

import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default function ModifierFerme(props) {
  let history = useHistory();
const [isLoading, setIsLoading] = useState(true);
const [Fermes,setFermes]=useState([]);
  const [Ferme, oldFerme] = useState({
    Nom: "",
    Code: "",
    SUPAD: "",
  });
  const handleChange = (e) => {
    oldFerme({
        Ferme,
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
      document.getElementById("NouveauCodeFerme").value=id;
      document.getElementById("PlaceholderFermeCode").value=id;
      console.log(id)
          }

  const handleClick = (e) => {
    Ferme.Nom = document.getElementById("NouveauNomFerme").value;
    Ferme.Code = document.getElementById("NouveauCodeFerme").value;
    Ferme.SUPAD = document.getElementById("NouveauSUPAD").value;
    console.log({ Ferme });

    Swal.fire({
        
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Modifier`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Votre Ferme a été modifié :) ", "success");
        e.preventDefault();
        
        axios
          //.put("http://localhost:4000/Fermes/UpdateFerme/"+props.id, {
            .put("http://143.110.210.169:4000/Fermes/UpdateFerme/"+props.id, {
            Nom: Ferme.Nom,
            Code: Ferme.Code,
            SUPAD: Ferme.SUPAD,
          })
          .then((res) => {
            console.log(res.data);
            history.push("/Fermes");
          })
          .catch((err) => {
            Swal.fire("Ooops", "Une Erreur au niveau de la Modification ", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé la modification d'une Ferme.", "error");
      }
    });
  };


    useEffect(()=>{
        //axios.get("http://localhost:4000/Fermes/"+props.id)
        axios.get("http://143.110.210.169:4000/Fermes/"+props.id)
        .then(res=>{
            setFermes(res.data);
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
  </div> : Fermes.length ? (
        Fermes.map(Ferme=>{
            return(
                <div className="content-body"  key={Ferme._id}>
                <div className="container-fluid">
                  <div className="page-titles">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="javascript:void(0)">Modifier Ferme</a>
                      </li>
                    </ol>
                  </div>
                  <div className="card-body">
                    <div className="basic-form">
                      <form>
                        <div className="form-row">
                          <div className="form-group col-md-3">
                            <label>Nom Ferme :</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nouveau Nom Complet De la Ferme"
                              type="text"
                              id={"NouveauNomFerme"}
                              name={"NouveauNomFerme"}
                              defaultValue={Ferme.Nom}
                              onChange={handleChange}
                            />
                          </div>
                          <div class="form-group col-md-3">
                          <label>Génerer Automatiquement Code Tache :</label>
                          <button className="btn btn-primary form-control" onClick={GenerateCode} id={"NouveauCodeFerme"} name={"NouveauCodeFerme"} onChange={handleChange}><i className="fa fa-plus-square"></i> Génerer Code </button><br/>Génerer Manuellement :
                          <input type="text" class="form-control" id={"PlaceholderFermeCode"}defaultValue={Ferme.Code}/>
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
                        Modifier Ferme
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
