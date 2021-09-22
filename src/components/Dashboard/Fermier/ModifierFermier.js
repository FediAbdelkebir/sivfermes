import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";

export default function Modifierfermier(props) {
    const id = props.match.params.id.trim();
  const [isLoading, setIsLoading] = useState(true);
  const [fermiers, setfermiers] = useState([]);
  const [Nouveaufermier, setNouveaufermier] = useState({
    Nom: "",
    Code: "",
    Description: "",
    Etat: "",
    Responsable: "",
    Points: "",
  });
  
  const ModifierValeur = (e) => {
    setNouveaufermier({
      Nouveaufermier,
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
      document.getElementById("NouveauCodefermier").value=id;
      document.getElementById("Placeholder").value=id;
      console.log(id)
          }
          
  const handleClick = (e) => {
    Swal.fire({
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Modifier`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Votre fermier a été Modifié :) ", "success");
        Nouveaufermier.Nom = document.getElementById("NouveauNomfermier").value;
        Nouveaufermier.Code = document.getElementById("NouveauCodefermier").value;
        Nouveaufermier.Description = document.getElementById("NouveauDescriptionfermier").value;
        Nouveaufermier.Etat = "En Cours";
        Nouveaufermier.Points = document.getElementById("NouveauPointsfermier").value;
        Nouveaufermier.Responsable = document.getElementById("Responsablefermier").value;
        console.log("Nouveau fermier : ");
        console.log({ Nouveaufermier });

        e.preventDefault();
        
        //axios.put(`http://localhost:4000/fermiers/updatefermier/${id}`, {
          axios.put(`http://admin.laitespoir.com:8187/api/employees/update/${id}`, {
            Nom: document.getElementById("NouveauNomfermier").value,
            Code: document.getElementById("NouveauCodefermier").value,
            Description: document.getElementById("NouveauDescriptionfermier").value,
            Etat: "En Cours",
            Points: document.getElementById("NouveauPointsfermier").value,
            Responsable: document.getElementById("Responsablefermier").value,
          })
          .then((res) => {
            console.log(res.data);
            props.history.push("/fermiers");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la modification de cette fermier.",
          "error"
        );
      }
    });
  };
  useEffect(() => {
    axios
      //.get(`http://localhost:4000/fermiers/fermier/${id}`)
      .get(`http://admin.laitespoir.com:8187/api/employees/one/${id}`)
      .then((res) => {
        setfermiers(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log);
  }, []);
  console.log(fermiers);
  const modifierfermier = isLoading ? (
    <h3>Loading fermiers...</h3>
  ) : fermiers.length ? (
    fermiers.map((fermier) => {
      return (
        <div class="content-body" key={fermier.idEmployees}>
          <div class="container-fluid">
            <div class="page-titles">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:void(0)">Modifier fermiers</a>
                </li>
              </ol>
            </div>
            <div class="card-body">
              <div class="basic-form">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label>Nom fermier :</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nouveau Nom Complet De la fermier"
                        id={"NouveauNomfermier"}
                        name={"NouveauNomfermier"}
                        onChange={ModifierValeur}
                        defaultValue={fermier.name}
                      />
                    </div>
                    <div class="form-group col-md-3">
                    <label>Génerer Automatiquement Code fermier :</label>
                    <button className="btn btn-primary form-control" onClick={GenerateCode} id={"NouveauCodefermier"} name={"NouveauCodefermier"} onChange={ModifierValeur} ><i className="fa fa-plus-square"></i> Génerer Code</button><br/>Génerer Manuellement :
                     <input type="text" class="form-control" id={"Placeholder"} defaultValue={fermier.Code}/>
                     </div>
                    
                    <div class="form-group col-md-2">
                      <label>Nombre de Points :</label>
                      <input
                        type="text"
                        class="form-control"
                        id={"NouveauPointsfermier"}
                        name={"NouveauPointsfermier"}
                        placeholder="Nouveau Nombre de points"
                     
                        defaultValue={fermier.Points}
                      />
                    </div>
                      <div className="form-group col-md-5">
              <label>Responsable :</label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Responsablefermier"}
                      name={"Responsablefermier"}>
              {SelectList}
</select>
            </div>
                   

                    <div class="form-group col-md-9">
                      <label>Description detaillé de la fermier :</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        id="comment"
                        placeholder="Nouveau Description sur la fermier.."
                        id={"NouveauDescriptionfermier"}
                        name={"NouveauDescriptionfermier"}
                        onChange={ModifierValeur}
                        defaultValue={fermier.Description}
                      ></textarea>
                    </div>
                  </div>
                </form>
                <button className="btn btn-primary" onClick={handleClick}>
                  <i className="fa fa-gears"></i> Modifier fermier
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <h3>Vide</h3>
  );
  return (
    <div Style="font-family: 'poppins', sans-serif;">
      <SideBar />
      {modifierfermier}
    </div>
  );
}
