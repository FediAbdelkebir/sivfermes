import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import {countBy} from "underscore";

export default function Fermiers() {

    const [isLoading, setIsLoading] = useState(true);
    const [Fermiers,setTaches]=useState([]);
    const [counttaches,setCountTaches]=useState([]);
    useEffect(()=>{
      
      //axios.get("http://localhost:4000/Fermiers/Fermier/count")
      axios.get("http://143.110.210.169:4000/Fermiers/Fermier/count")
      .then(res=>{
        setCountTaches(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
  }, []);

  useEffect(()=>{
    //axios.get("http://localhost:4000/Fermiers/")
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
        //axios.get("http://localhost:4000/Fermiers/")
        axios.get("http://localhost:8187/api/employees/list")
      .then(res=>{
          setTaches(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
      }else{
      var filtered_taches = Fermiers;

        filtered_taches=Fermiers.filter(Fermier=>Fermier.name.toLowerCase().includes(keyword.toLowerCase()));
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
  </div>  : Fermiers.length ? (
      Fermiers
      .map(Fermier=>{
        let Etat="";
        if (Fermier.Etat=="Validé") {
          Fermier.Etat = <span class="badge light badge-success">Validé</span>;
        }
        if (Fermier.Etat=="En Cours") {
          Fermier.Etat = <span class="badge light badge-warning">En Cours</span>;
        }
        if (Fermier.Etat=="Terminé") {
          Fermier.Etat = <span class="badge light badge-danger">Terminé</span>;
        }
          return(
            
                  <tr key={Fermier.idEmployees}>
              <td>
                <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={"Fermier.Code"}
                    required=""
                    name={"Fermier.Code"}
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
                  <span className="w-space-no">{Fermier.name}</span>
                </div>
              </td>
              
              <td>{Fermier.email}</td>
              <td>{Fermier.gender}</td>
              <td>{Fermier.dateJoin}</td>
              <td>{Fermier.dateOff}</td>
              <td>{Fermier.birthday}</td>
              <td>
                <div className="d-flex">
                  <Link
                    to={`/ModifierFermier/`+Fermier.idEmployees} 
                    className="btn btn-primary shadow btn-xs sharp mr-1"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <a href="#" onClick={(e) =>deletetache(Fermier.idEmployees, e)} className="btn btn-danger shadow btn-xs sharp" ><i className="fa fa-trash"></i></a>
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
        //axios.delete("http://localhost:4000/Fermiers/deletetache/"+id);
        axios.delete("http://143.110.210.169:4000/Fermiers/deletetache/"+id);
        Swal.fire("Success", "Fermier Supprimé :) ", "success");
        let newList = Fermiers.filter(Fermier=>{
            return Fermier.idEmployees !== id;
        })
        setTaches(newList);
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la suppresion de cette Fermier.",
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
        //axios.delete("http://localhost:4000/Fermiers/deletetaches/:id",{
          axios.delete("http://143.110.210.169:4000/Fermiers/deletetaches/:id",{
      params: {
        id: id
      }});
        Swal.fire("Success", "Fermiers Supprimé :) ", "success");
      } else {
        Swal.fire(
          "Annulé",
          "Vous Avez Annulé la suppresion de ces Fermiers.",
          "error"
        );
      }
    });
  }
  function Trienom(e){
    e.preventDefault();
    setTaches(sortBy(Fermiers, "name"));
}
function TrieEmail(e){
  e.preventDefault();
  setTaches(sortBy(Fermiers, "email"));
}
function TrieGenre(e){
  e.preventDefault();
  setTaches(sortBy(Fermiers, "gender"));
}
function Triedatedebut(e){
  e.preventDefault();
setTaches(sortBy(Fermiers, "dateJoin"));
}
function Triedatefin(e){
  e.preventDefault();
  setTaches(sortBy(Fermiers, "dateOff"));
}
function Triedatenaissance(e){
  e.preventDefault();
  setTaches(sortBy(Fermiers, "birthday"));
}
    return (
<div>
  <SideBar />
  <div className="content-body" style={{fontFamily: "'poppins', sans-serif"}}>
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a><strong>Fermiers</strong></a>
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
        

        <Link to={`/AjouterFermier`} className="btn btn-primary ml-auto">
          <i className="fa fa-plus-circle"></i> Ajouter Fermier
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
                <a href="#" className="btn btn-info ml-auto" onClick={Trienom}> <i className="fa fa-sort"></i></a>
                </th>
                
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={TrieEmail}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={TrieGenre}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={Triedatedebut}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={Triedatefin}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a href="#" className="btn btn-info ml-auto" onClick={Triedatenaissance}> <i className="fa fa-sort"></i></a>
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
                <th>
                  <strong>Date Naissance</strong>
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