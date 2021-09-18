import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";

export default function Modifiercategoriestock(props) {
    const id = props.match.params.id.trim();
  const [isLoading, setIsLoading] = useState(true);
  const [categoriecategoriestocks, setcategoriestocks] = useState([]);
  const [Nouveaucategoriestock, setNouveaucategoriestock] = useState({
    Nom: "",
    Code: "",
    Description: "",
    Etat: "",
    Responsable: "",
    Points: "",
  });
  
  const ModifierValeur = (e) => {
    setNouveaucategoriestock({
      Nouveaucategoriestock,
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
      document.getElementById("NouveauCodecategoriestock").value=id;
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
        Swal.fire("Success", "Votre categoriecategoriestock a été Modifié :) ", "success");
        Nouveaucategoriestock.Nom = document.getElementById("NouveauNomcategoriestock").value;
        Nouveaucategoriestock.Code = document.getElementById("NouveauCodecategoriestock").value;
        Nouveaucategoriestock.Description = document.getElementById("NouveauDescriptioncategoriestock").value;
        Nouveaucategoriestock.Etat = "En Cours";
        Nouveaucategoriestock.Points = document.getElementById("NouveauPointscategoriestock").value;
        Nouveaucategoriestock.Responsable = document.getElementById("Responsablecategoriestock").value;
        console.log("Nouveau categoriecategoriestock : ");
        console.log({ Nouveaucategoriestock });

        e.preventDefault();
        
        //axios.put(`http://localhost:4000/categoriecategoriestocks/updatecategoriestock/${id}`, {
          axios.put(`http://localhost:8187/api/employees/update/${id}`, {
            Nom: document.getElementById("NouveauNomcategoriestock").value,
            Code: document.getElementById("NouveauCodecategoriestock").value,
            Description: document.getElementById("NouveauDescriptioncategoriestock").value,
            Etat: "En Cours",
            Points: document.getElementById("NouveauPointscategoriestock").value,
            Responsable: document.getElementById("Responsablecategoriestock").value,
          })
          .then((res) => {
            console.log(res.data);
            props.history.push("/categoriecategoriestocks");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la modification de cette categoriecategoriestock.",
          "error"
        );
      }
    });
  };
  useEffect(() => {
    axios
      //.get(`http://localhost:4000/categoriecategoriestocks/categoriecategoriestock/${id}`)
      .get(`http://localhost:8187/api/employees/one/${id}`)
      .then((res) => {
        setcategoriestocks(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log);
  }, []);
  console.log(categoriecategoriestocks);
  const modifiercategoriestock = isLoading ? (
    <h3>Loading categoriecategoriestocks...</h3>
  ) : categoriecategoriestocks.length ? (
    categoriecategoriestocks.map((categoriecategoriestock) => {
      return (
        <div class="content-body" key={categoriecategoriestock.idEmployees}>
          <div class="container-fluid">
            <div class="page-titles">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:void(0)">Modifier categoriecategoriestocks</a>
                </li>
              </ol>
            </div>
            <div class="card-body">
              <div class="basic-form">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label>Nom categoriecategoriestock :</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nouveau Nom Complet De la categoriecategoriestock"
                        id={"NouveauNomcategoriestock"}
                        name={"NouveauNomcategoriestock"}
                        onChange={ModifierValeur}
                        defaultValue={categoriecategoriestock.name}
                      />
                    </div>
                    <div class="form-group col-md-3">
                    <label>Génerer Automatiquement Code categoriecategoriestock :</label>
                    <button className="btn btn-primary form-control" onClick={GenerateCode} id={"NouveauCodecategoriestock"} name={"NouveauCodecategoriestock"} onChange={ModifierValeur} ><i className="fa fa-plus-square"></i> Génerer Code</button><br/>Génerer Manuellement :
                     <input type="text" class="form-control" id={"Placeholder"} defaultValue={categoriecategoriestock.Code}/>
                     </div>
                    
                    <div class="form-group col-md-2">
                      <label>Nombre de Points :</label>
                      <input
                        type="text"
                        class="form-control"
                        id={"NouveauPointscategoriestock"}
                        name={"NouveauPointscategoriestock"}
                        placeholder="Nouveau Nombre de points"
                     
                        defaultValue={categoriecategoriestock.Points}
                      />
                    </div>
                      <div className="form-group col-md-5">
              <label>Responsable :</label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Responsablecategoriestock"}
                      name={"Responsablecategoriestock"}>
              {SelectList}
</select>
            </div>
                   

                    <div class="form-group col-md-9">
                      <label>Description detaillé de la categoriecategoriestock :</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        id="comment"
                        placeholder="Nouveau Description sur la categoriecategoriestock.."
                        id={"NouveauDescriptioncategoriestock"}
                        name={"NouveauDescriptioncategoriestock"}
                        onChange={ModifierValeur}
                        defaultValue={categoriecategoriestock.Description}
                      ></textarea>
                    </div>
                  </div>
                </form>
                <button className="btn btn-primary" onClick={handleClick}>
                  <i className="fa fa-gears"></i> Modifier categoriecategoriestock
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
      {modifiercategoriestock}
    </div>
  );
}
