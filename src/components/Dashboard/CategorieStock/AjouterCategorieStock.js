import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import Swal from "sweetalert2";
export default function AjouterCategorieStock({history}) {
    const [CategorieStock, setStock] = useState({
        Marque: "",
        Type: ""
      });
      function Verif(){
        if((document.getElementById("NomCategorieStock").value=="")||(document.getElementById("TypeCategorieStock").value=="")
){
      return false
        }
        else{
          return true
        }     
      }
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
            
            CategorieStock.Marque = document.getElementById("NomCategorieStock").value;
            CategorieStock.Type = document.getElementById("TypeCategorieStock").value;
            console.log({ CategorieStock });
    
            e.preventDefault();
            axios
              //.post("http://localhost:4000/CategorieStocks/createCategorieStock", {
                .post("/api/employees/save", {
                Marque: CategorieStock.Marque,
                Type: CategorieStock.Type,
              })
              .then((res) => {
                Swal.fire("Success", "Votre CategorieStock a été créé :) ", "success");
                console.log(res.data);
                history.push("/CategorieStocks");
              })
              .catch((err) => {
                Swal.fire("Ooops", "Une Erreur au niveau de l'insertion ", "error");
                console.error(err);
              });
          } else {
            Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une CategorieStock.", "error");
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
            <a href="javascript:void(0)">Ajouter CategorieStocks</a>
          </li>
        </ol>
      </div>
      <div class="card-body">
                                <div class="basic-form">
                                    <form>

                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label>Marque Categorie</label>
                                                <input type="text" class="form-control" placeholder="Nom Complet De la CategorieStock"
                                                                      id={"NomCategorieStock"}
                                                                      name={"NomCategorieStock"}
                                                />
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Type Categorie</label>
                                                <input type="text" class="form-control" placeholder="Nom Complet De la CategorieStock"
                                                                      id={"TypeCategorieStock"}
                                                                      name={"TypeCategorieStock"}
                                                />
                                            </div>
                     
                                        
                                        </div>
                                        
                                        
                                    </form>
                                    <button className="btn btn-primary" onClick={handleClick}><i className="fa fa-plus-square"></i> Ajouter Categorie</button>
                                    
                                </div>
                            </div>
    </div>
  </div>
 
</div>

      
    );
}