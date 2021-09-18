import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import {countBy} from "underscore";

export default function Stocks() {

    const [isLoading, setIsLoading] = useState(true);
    const [Stocks,setTaches]=useState([]);
    const [counttaches,setCountTaches]=useState([]);
    useEffect(()=>{
      
      //axios.get("http://localhost:4000/Stocks/Stock/count")
      axios.get("http://143.110.210.169:4000/Stocks/Stock/count")
      .then(res=>{
        setCountTaches(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
  }, []);

  useEffect(()=>{
    //axios.get("http://localhost:4000/Stocks/")
    axios.get("http://localhost:8187/api/employees/list")
    .then(res=>{
      setTaches(res.data);
        setIsLoading(false);
    })
    .catch(err=>console.log)
}, []);

    const handleChange = (e) => {
      var keyword = document.getElementById("ValeurRechercheTaches").value;
      if (keyword.length<1){
        console.log("Fergha");
        //axios.get("http://localhost:4000/Stocks/")
        axios.get("http://localhost:8187/api/employees/list")
      .then(res=>{
          setTaches(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
      }else{
      var filtered_taches = Stocks;

        filtered_taches=Stocks.filter(Stock=>Stock.name.toLowerCase().includes(keyword.toLowerCase()));
        setTaches(filtered_taches);
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
  </div>  : Stocks.length ? (
      Stocks
      .map(Stock=>{
        let Etat="";
        if (Stock.Etat=="Validé") {
          Stock.Etat = <span class="badge light badge-success">Validé</span>;
        }
        if (Stock.Etat=="En Cours") {
          Stock.Etat = <span class="badge light badge-warning">En Cours</span>;
        }
        if (Stock.Etat=="Terminé") {
          Stock.Etat = <span class="badge light badge-danger">Terminé</span>;
        }
          return(
            
                  <tr key={Stock.idEmployees}>
              <td>
                <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={"Stock.Code"}
                    required=""
                    name={"Stock.Code"}
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
                  <span className="w-space-no">{Stock.name}</span>
                </div>
              </td>
              
              <td>{Stock.email}</td>
              <td>{Stock.gender}</td>
              <td>{Stock.dateJoin}</td>
              <td>{Stock.dateOff}</td>
              <td>
                <div className="d-flex">
                  <Link
                    to={`/ModifierStock/`+Stock.idEmployees} 
                    className="btn btn-primary shadow btn-xs sharp mr-1"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <a href="#" onClick={(e) =>deletetache(Stock.idEmployees, e)} className="btn btn-danger shadow btn-xs sharp" ><i className="fa fa-trash"></i></a>
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
        //axios.delete("http://localhost:4000/Stocks/deletetache/"+id);
        axios.delete("http://143.110.210.169:4000/Stocks/deletetache/"+id);
        Swal.fire("Success", "Stock Supprimé :) ", "success");
        let newList = Stocks.filter(Stock=>{
            return Stock.idEmployees !== id;
        })
        setTaches(newList);
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la suppresion de cette Stock.",
          "error"
        );
      }
    });
  };
  
  const deleteall = (id) => {
    Swal.fire({
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Oui, Supprimer`,
      denyButtonText: `Non, Annuler`,
    }).then((result) => {
      if (result.isConfirmed) {
        //axios.delete("http://localhost:4000/Stocks/deletetaches/:id",{
          axios.delete("http://143.110.210.169:4000/Stocks/deletetaches/:id",{
      params: {
        id: id
      }});
        Swal.fire("Success", "Stocks Supprimé :) ", "success");
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la suppresion de ces Stocks.",
          "error"
        );
      }
    });
  }
  function Trienom(e){
    e.preventDefault();
    setTaches(sortBy(Stocks, "Nom"));
}
function TrieCode(e){
  e.preventDefault();
  setTaches(sortBy(Stocks, "Code"));
}
function TrieResponsable(e){
  e.preventDefault();
  setTaches(sortBy(Stocks, "SUPAD"));
}
function TrieEtat(e){
  e.preventDefault();
setTaches(sortBy(Stocks, "Etat"));
}
function TrieDescription(e){
  e.preventDefault();
  setTaches(sortBy(Stocks, "Description"));
}
function TriePoints(e){
  e.preventDefault();
  setTaches(sortBy(Stocks, "Points"));
}
    return (
<div>
  <SideBar />
  <div className="content-body" style={{fontFamily: "'poppins', sans-serif"}}>
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a>Stocks</a>
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
          <input type="text" className="form-control" placeholder="Rechercher.." id="ValeurRechercheTaches" onChange={handleChange}/>
        </div>
        <a href="#" className="btn btn-info ml-auto" onClick={Trienom}> <i className="fa fa-sort"></i> Nom</a>
          <a href="#" className="btn btn-info ml-auto" onClick={TrieCode}><i className="fa fa-sort"></i> Code</a>
          <a href="#" className="btn btn-info ml-auto" onClick={TrieDescription}><i className="fa fa-sort"></i> Description</a>
          <a href="#" className="btn btn-info ml-auto" onClick={TriePoints}><i className="fa fa-sort"></i> Points</a>
          <a href="#" className="btn btn-info ml-auto" onClick={TrieResponsable}><i className="fa fa-sort"></i> Responsable</a>
          <a href="#" className="btn btn-info ml-auto" onClick={TrieEtat}><i className="fa fa-sort"></i> Etat</a>
        <Link to={`/AjouterTache`} className="btn btn-primary ml-auto">
          <i className="fa fa-plus-circle"></i> Ajouter Stock
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
                  <strong>Nom</strong>
                </th>
                
                <th>
                  <strong>Email</strong>
                </th>
                <th>
                  <strong>Genre</strong>
                </th>
                <th>
                  <strong>Date Debut</strong>
                </th>
                <th>
                  <strong>Date Fin</strong>
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
        <a href="#" className="btn btn-danger ml-auto" onClick={deleteall}><i className="fa fa-trash"></i> Delete Selected items</a>
      </div>
      
    </div>
  </div>

</div>


    );}