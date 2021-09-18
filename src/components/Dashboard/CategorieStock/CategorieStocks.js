import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import {countBy} from "underscore";

export default function CategorieStocks() {

    const [isLoading, setIsLoading] = useState(true);
    const [CategorieStocks,setCategorieStocks]=useState([]);


  useEffect(()=>{
    //axios.get("http://localhost:4000/CategorieStocks/")
    axios.get("http://localhost:8187/api/employees/list")
    .then(res=>{
      setCategorieStocks(res.data);
        setIsLoading(false);
    })
    .catch(err=>console.log)
}, []);

    const handleChange = (e) => {
      var keyword = document.getElementById("ValeurRechercheCategorieStocks").value;
      if (keyword.length<1){
        console.log("Fergha");
        //axios.get("http://localhost:4000/CategorieStocks/")
        axios.get("http://localhost:8187/api/employees/list")
      .then(res=>{
          setCategorieStocks(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
      }else{
      var filtered_taches = CategorieStocks;

        filtered_taches=CategorieStocks.filter(CategorieStock=>CategorieStock.name.toLowerCase().includes(keyword.toLowerCase()));
        setCategorieStocks(filtered_taches);
      }
      
}
    const content = isLoading ?  <div class="loader">
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
  </div>  : CategorieStocks.length ? (
      CategorieStocks
      .map(CategorieStock=>{
          return(
            
                  <tr key={CategorieStock.id}>
              <td>
                <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={"CategorieStock.Code"}
                    required=""
                    name={"CategorieStock.Code"}
                  />
                  <label
                    className="custom-control-label"
                    for="customCheckBox2"
                  ></label>
                </div>
              </td>
              
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="images/avatar/1.jpg"
                    className="rounded-lg mr-2"
                    alt=""
                    width="24"
                  />{" "}
                  <span className="w-space-no">{CategorieStock.Marque}</span>
                </div>
              </td>
              
              <td>{CategorieStock.Type}</td>
              <td>
                <div className="d-flex">
                  <Link
                    to={`/ModifierCategorieStock/`+CategorieStock.idEmployees} 
                    className="btn btn-primary shadow btn-xs sharp mr-1"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <a href="#" onClick={(e) =>deletetache(CategorieStock.idEmployees, e)} className="btn btn-danger shadow btn-xs sharp" ><i className="fa fa-trash"></i></a>
                </div>
              </td>
            </tr>
          )
      })
  ): <h3>Empty List !</h3>;

  function deletetache(id) {
    Swal.fire({
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Oui, Supprimer`,
      denyButtonText: `Non, Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://143.110.210.169:4000/CategorieStocks/deletetache/"+id);
        Swal.fire("Success", "CategorieStock Supprimé :) ", "success");
        let newList = CategorieStocks.filter(CategorieStock=>{
            return CategorieStock.idEmployees !== id;
        })
        setCategorieStocks(newList);
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la suppresion de cette CategorieStock.",
          "error"
        );
      }
    });
  };
  
  function TrieMarque(e){
    e.preventDefault();
    setCategorieStocks(sortBy(CategorieStocks, "Marque"));
}
function TrieType(e){
  e.preventDefault();
  setCategorieStocks(sortBy(CategorieStocks, "Type"));
}

    return (
<div>
  <SideBar />
  <div className="content-body" style={{fontFamily: "'poppins', sans-serif"}}>
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a>Categories </a>
          </li>
        </ol>
      </div>
     
      <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
        <div className="input-group search-area d-inline-flex">
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="flaticon-381-search-2"></i>
            </span>
          </div>
          <input type="text" className="form-control" placeholder="Rechercher.." id="ValeurRechercheCategorieStocks" onChange={handleChange}/>
        </div>

        
        <Link to={`/AjouterCategorieStock`} className="btn btn-primary ml-auto">
          <i className="fa fa-plus-circle"></i> Ajouter Categorie
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-responsive-md">
            <thead>
            <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkAll"
                      required=""
                    />
                    <label className="custom-control-label" htmlFor="checkAll"></label>
                  </div>
                </th>
                
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={TrieMarque}> <i className="fa fa-sort"></i></a>
                </th>
                
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={TrieType}> <i className="fa fa-sort"></i></a>
                </th>
                
              </tr>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkAll"
                      required=""
                    />
                    <label className="custom-control-label" htmlFor="checkAll"></label>
                  </div>
                </th>
                
                <th>
                  <strong>Marque</strong>
                </th>
                
                <th>
                  <strong>Type</strong>
                </th>
                <th>
                  <strong>Gestion</strong>
                </th>
                
              </tr>
            </thead> 
            
            {content}

          </table>
        </div>
      </div>
      <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
        <div className="input-group search-area d-inline-flex">
          <div className="input-group-append">
          </div>
        </div>
      </div>
      
    </div>
  </div>

</div>


    );}