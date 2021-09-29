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
const [categories,setCategories]=useState([]);
const [stock, setStock] = useState({
  "createdAt": "2021-09-29T16:03:12.751Z",
  "updatedAt": "2021-09-29T16:03:12.751Z",
  name: "",
  categorie: "",
  Kg: ""
});


useEffect(()=>{

  axios.get("http://admin.laitespoir.com:8187/api/AlimentationStaticDatas/one/"+props.id)
  .then(res=>{
    setStock(res.data);
      console.log(stock);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

useEffect(()=>{
  axios.get("http://admin.laitespoir.com:8187/api/categories")
  .then(res=>{
      setCategories(res.data);
      setIsLoading(false);
  })
  .catch(err=>console.log)
}, []);

const SelectList = isLoading ? <option>Chargements des Categories ...</option> : categories.length ? (
categories
    .map(user=>{
        return(
          <option selected>{user.name}</option>
        )
    })
): <h3>Aucun categorie Trouvé !</h3>;

function Verif(){
  if ((document.getElementById("Nomstock").value=="")||(document.getElementById("Catégorie").value=="")||(document.getElementById("Kg").value=="")){
    return false;
  }else{
    return true;
  }

};

const handleClick = (e) => {
  if(Verif()){
  Swal.fire({
    title: "Vous etez sur?",
    text: "Veuillez Vérifier vos besoin avant de envoyé ",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: `Modifier`,
    denyButtonText: `Non`,
  }).then((result) => {
    if (result.isConfirmed) {
      
      stock.name = document.getElementById("Nomstock").value;
      stock.categorie = document.getElementById("Catégorie").value;
      stock.Kg = document.getElementById("Kg").value;
      console.log({ stock });

      e.preventDefault();
      axios
          .put("http://admin.laitespoir.com:8187/api/AlimentationStaticDatas/update", {
            name: stock.name,
            categorie: stock.categorie,
            matiereSeche: stock.Kg,
        },{
          headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then((res) => {
          Swal.fire("Success", "Votre Fermier a été Modifié :) ", "success");
          console.log(res.data);
          history.push("/fermiers");
        })
        .catch((err) => {
          Swal.fire("Ooops", "Une Erreur au niveau de la Modification ", "error");
          console.error(err);
        });
    } else {
      Swal.fire("Annulé", "Vous Avez Annulé la Modefication du Fermier.", "error");
    }
  });
}else{
  Swal.fire("Erreur", "Veuillez remplire tous les champs .", "error");
}
};

var ListModif=[];
ListModif.push(stock);

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
  </div> : ListModif.length ? (
        ListModif.map(stock=>{
          console.log(ListModif)
            return(
              <div class="content-body">
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
                                                <label>name Stock</label>
                                                <input type="text" class="form-control" placeholder="name Complet De la stock"
                                                                      id={"Nomstock"}
                                                                      name={"Nomstock"}
                                                                      defaultValue={stock.name}
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
              <label>Catégories </label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Catégorie"}
                      name={"Catégorie"} defaultValue={stock.categorie}>
              {SelectList}
</select>
            </div>
                                            <div class="form-group col-md-3">
                                                <label>Kg</label>
                                                <input type="number" class="form-control" placeholder="La Quantité En Kilograme"
                                                                      id={"Kg"}
                                                                      name={"Kg"}
                                                                      defaultValue={stock.Kg}
                                                />
                                            </div>
                                        </div>       
                                    </form>
                                    <button className="btn btn-primary" onClick={handleClick}><i className="fa fa-plus-square"></i> Modifier stock</button>
                                    
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
