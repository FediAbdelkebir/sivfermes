import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";

export default function Modifierstock(props) {
    const id = props.match.params.id.trim();
  const [isLoading, setIsLoading] = useState(true);
  const [stocks, setstocks] = useState([]);
  const [Nouveaustock, setNouveaustock] = useState({
    Nom: "",
    Code: "",
    Description: "",
    Etat: "",
    Responsable: "",
    Points: "",
  });
  
  const ModifierValeur = (e) => {
    setNouveaustock({
      Nouveaustock,
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
      document.getElementById("NouveauCodestock").value=id;
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
        Swal.fire("Success", "Votre stock a été Modifié :) ", "success");
        Nouveaustock.Nom = document.getElementById("NouveauNomstock").value;
        Nouveaustock.Code = document.getElementById("NouveauCodestock").value;
        Nouveaustock.Description = document.getElementById("NouveauDescriptionstock").value;
        Nouveaustock.Etat = "En Cours";
        Nouveaustock.Points = document.getElementById("NouveauPointsstock").value;
        Nouveaustock.Responsable = document.getElementById("Responsablestock").value;
        console.log("Nouveau stock : ");
        console.log({ Nouveaustock });

        e.preventDefault();
        
        //axios.put(`http://localhost:4000/stocks/updatestock/${id}`, {
          axios.put(`http://admin.laitespoir.com:8187/api/employees/update/${id}`, {
            Nom: document.getElementById("NouveauNomstock").value,
            Code: document.getElementById("NouveauCodestock").value,
            Description: document.getElementById("NouveauDescriptionstock").value,
            Etat: "En Cours",
            Points: document.getElementById("NouveauPointsstock").value,
            Responsable: document.getElementById("Responsablestock").value,
          })
          .then((res) => {
            console.log(res.data);
            props.history.push("/stocks");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la modification de cette stock.",
          "error"
        );
      }
    });
  };
  useEffect(() => {
    axios
      //.get(`http://localhost:4000/stocks/stock/${id}`)
      .get(`http://admin.laitespoir.com:8187/api/employees/one/${id}`)
      .then((res) => {
        setstocks(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log);
  }, []);
  console.log(stocks);
  const modifierstock = isLoading ? (
    <h3>Loading stocks...</h3>
  ) : stocks.length ? (
    stocks.map((stock) => {
      return (
        <div class="content-body" key={stock.idEmployees}>
          <div class="container-fluid">
            <div class="page-titles">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:void(0)">Modifier stocks</a>
                </li>
              </ol>
            </div>
            <div class="card-body">
              <div class="basic-form">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-3">
                      <label>Nom stock :</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nouveau Nom Complet De la stock"
                        id={"NouveauNomstock"}
                        name={"NouveauNomstock"}
                        onChange={ModifierValeur}
                        defaultValue={stock.name}
                      />
                    </div>
                    <div class="form-group col-md-3">
                    <label>Génerer Automatiquement Code stock :</label>
                    <button className="btn btn-primary form-control" onClick={GenerateCode} id={"NouveauCodestock"} name={"NouveauCodestock"} onChange={ModifierValeur} ><i className="fa fa-plus-square"></i> Génerer Code</button><br/>Génerer Manuellement :
                     <input type="text" class="form-control" id={"Placeholder"} defaultValue={stock.Code}/>
                     </div>
                    
                    <div class="form-group col-md-2">
                      <label>Nombre de Points :</label>
                      <input
                        type="text"
                        class="form-control"
                        id={"NouveauPointsstock"}
                        name={"NouveauPointsstock"}
                        placeholder="Nouveau Nombre de points"
                     
                        defaultValue={stock.Points}
                      />
                    </div>
                      <div className="form-group col-md-5">
              <label>Responsable :</label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Responsablestock"}
                      name={"Responsablestock"}>
              {SelectList}
</select>
            </div>
                   

                    <div class="form-group col-md-9">
                      <label>Description detaillé de la stock :</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        id="comment"
                        placeholder="Nouveau Description sur la stock.."
                        id={"NouveauDescriptionstock"}
                        name={"NouveauDescriptionstock"}
                        onChange={ModifierValeur}
                        defaultValue={stock.Description}
                      ></textarea>
                    </div>
                  </div>
                </form>
                <button className="btn btn-primary" onClick={handleClick}>
                  <i className="fa fa-gears"></i> Modifier stock
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
      {modifierstock}
    </div>
  );
}
