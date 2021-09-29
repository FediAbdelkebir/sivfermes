import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import Swal from "sweetalert2";
export default function Ajouterstock({history}) {
    const [stock, setStock] = useState({
        "createdAt": "2021-09-29T16:03:12.751Z",
        "updatedAt": "2021-09-29T16:03:12.751Z",
        name: "",
        categorie: "",
        Kg: ""
      });
 
      const [categories,setCategories]=useState([]);
      const [isLoading, setIsLoading] = useState(true);
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
        if (Verif()){
        Swal.fire({
          title: "Vous etez sur?",
          text: "Veuillez Vérifier vos besoin avant de envoyé ",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: `Ajouter`,
          denyButtonText: `Non`,
        }).then((result) => {
          if (result.isConfirmed) {
            
            stock.name = document.getElementById("Nomstock").value;
            stock.categorie = document.getElementById("Catégorie").value;
            stock.Kg = document.getElementById("Kg").value;
            console.log({ stock });
    
            e.preventDefault();
            axios
                .post("http://admin.laitespoir.com:8187/api/AlimentationStaticDatas/save", {
                name: stock.name,
                categorie: stock.categorie,
                matiereSeche: stock.Kg,
              })
              .then((res) => {
                Swal.fire("Success", "Votre stock a été créé :) ", "success");
                console.log(res.data);
                history.push("/stocks");
              })
              .catch((err) => {
                Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
                console.error(err);
              });
            
          } else {
            Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une stock.", "error");
          }
        });
      }else{
        Swal.fire("Erreur", "Veuillez remplire tous les champs", "error");
      }
      };

    return (
<div Style="font-family: 'poppins', sans-serif;">
  <SideBar />
  <div class="content-body">
    <div class="container-fluid">
      <div class="page-titles">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Ajouter stocks</a>
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
                                                />
                                            </div>
                                            <div className="form-group col-md-5">
              <label>Catégories </label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-5 " id={"Catégorie"}
                      name={"Catégorie"}>
              {SelectList}
</select>
            </div>
                                            <div class="form-group col-md-3">
                                                <label>Kg</label>
                                                <input type="number" class="form-control" placeholder="La Quantité En Kilograme"
                                                                      id={"Kg"}
                                                                      name={"Kg"}
                                                />
                                            </div>
                                        </div>       
                                    </form>
                                    <button className="btn btn-primary" onClick={handleClick}><i className="fa fa-plus-square"></i> Ajouter stock</button>
                                    
                                </div>
                            </div>
    </div>
  </div>
 
</div>

      
    );
}