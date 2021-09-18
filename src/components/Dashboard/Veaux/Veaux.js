import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import SideBar from '../SideBar';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {sortBy} from "underscore";
import $ from 'jquery';


export default function Veaux() {
    const [isLoading, setIsLoading] = useState(true);
    const [veaux,setVeaux]=useState([]);

    const handleChange = (e) => {
        var keyword = document.getElementById("ValeurRechercheVeaux").value;
        if (keyword.length<1){
          console.log("Fergha");
          axios.get("http://localhost:8187/api/animals/veaux/list")
        .then(res=>{
            setVeaux(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
        }else{
        var filtered_veaux = veaux;

          filtered_veaux=veaux.filter(veaux=>veaux.matriculeAnimal.toLowerCase().includes(keyword.toLowerCase()));
          setVeaux(filtered_veaux);
        }
        
  }
  

    const deletesociete = (id) => {
      Swal.fire({
        title: "Vous etez sur?",
        text: "Veuillez Vérifier vos besoin avant de envoyé ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: `Oui, Supprimer`,
        denyButtonText: `Non, Annuler`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8187/api/animals/veaux/delete"+id);
         // axios.delete("http://localhost:4000/veaux/"+id);
          Swal.fire("Success", "Votre tache a été Modifié :) ", "success");
        } else {
          Swal.fire(
            "Annulé",
            "Vous Avez Annulé la suppresion de cette Veaux.",
            "error"
          );
        }
      });

      
    };


    useEffect(()=>{
      axios.get("http://localhost:8187/api/animals/veaux/list")
        .then(res=>{
            setVeaux(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);

function Trieweightrecived(e){
    e.preventDefault();
  setVeaux(sortBy(veaux, "Nom"));
}
function TrieoriginWeight(e){
    e.preventDefault();
  setVeaux(sortBy(veaux, "originWeight"));
}
function Trieborn_weight(e){
    e.preventDefault();
  setVeaux(sortBy(veaux, "born_weight"));
}
function Triegender(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "gender"));
}
function Triebirthday(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "birthday"));
}
function TriebornStatus(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "bornStatus"));
}
function TrieanimalsType(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "animalsType"));
}
function TrieoriginFather(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "originFather"));
}
function TrieoriginMother(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "originMother"));
}
function TriematriculeAnimal(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "matriculeAnimal"));
}
function Triedescription(e){
  e.preventDefault();
setVeaux(sortBy(veaux, "description"));
}

    const content = isLoading ? <div class="loader">
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
  </div> : veaux.length ? (
        veaux
        .map(veaux=>{
            return(
                    <tr key={veaux.idAnimals} id="RechercheVeaux">
                <td>
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3" name={veaux._id}>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={veaux.idAnimals}
                      required=""
                      name={veaux.idAnimals}
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
                    />
                    <span className="w-space-no">{veaux.receiveWeight}</span>
                  </div>
                </td>
                
                <td>{veaux.originWeight}</td>
                <td>{veaux.born_weight}</td>
                <td>{veaux.gender}</td>
                <td>{veaux.birthday}</td>
                <td>{veaux.bornStatus}</td>
                <td>{veaux.animalsType}</td>
                <td>{veaux.originFather}</td>
                <td>{veaux.originMother}</td>
                <td>{veaux.matriculeAnimal}</td>
                <td>{veaux.description}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/ModifierSociete/`+veaux._id}
                      className="btn btn-primary shadow btn-xs sharp mr-1"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <a href="#" onClick={(e) =>deletesociete(veaux._id, e)} className="btn btn-danger shadow btn-xs sharp">
                      <i className="fa fa-trash"></i>
                      </a>
                  </div>
                </td>
              </tr>
            )
        })
    ): <h3>Empty List !</h3>;
    return (
<div>
  <SideBar />
  <div className="content-body" Style="font-family: 'poppins', sans-serif;">
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a><strong>Veaux</strong></a>
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
          <input type="text" className="form-control" placeholder="Search here" id="ValeurRechercheVeaux" onChange={handleChange}/>&nbsp;

        </div>
        
        
        <Link to={`/AjouterVeaux`} className="btn btn-primary ml-auto"><i className="fa fa-plus-circle"></i> Ajouter veaux</Link>
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
                    <label className="custom-control-label" for="checkAll"></label>
                  </div>
                </th>
                
                <th>
                  <a  href="#" className="btn btn-info ml-auto" onClick={Trieweightrecived}> <i className="fa fa-sort"></i></a>
                </th>
                
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TrieoriginWeight}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={Trieborn_weight}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={Triegender}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={Triebirthday}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TriebornStatus}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TrieanimalsType}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TrieoriginMother}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TrieoriginFather}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={TriematriculeAnimal}> <i className="fa fa-sort"></i></a>
                </th>
                <th>
                <a  href="#" className="btn btn-info ml-auto" onClick={Triedescription}> <i className="fa fa-sort"></i></a>
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
                    <label className="custom-control-label" for="checkAll"></label>
                  </div>
                </th>
                
                <th>
                  <strong>Receive Weight</strong>
                </th>
                
                <th>
                  <strong>Origin Weight</strong>
                </th>
                <th>
                  <strong>Born Weight</strong>
                </th>
                <th>
                  <strong>Gender</strong>
                </th>
                <th>
                  <strong>Birthday</strong>
                </th>
                <th>
                  <strong>Born Status</strong>
                </th>
                <th>
                  <strong>Type</strong>
                </th>
                <th>
                  <strong>Origine Mother</strong>
                </th>
                <th>
                  <strong>Origine Father</strong>
                </th>
                <th>
                  <strong>Matricule</strong>
                </th>
                <th>
                  <strong>Description</strong>
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