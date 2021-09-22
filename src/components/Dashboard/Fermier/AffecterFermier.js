import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../css/style.css';
import '../../css/Card.css';
import SideBar from '../SideBar';
import Swal from "sweetalert2";

export default function AjouterFermier() {
    const [isLoading, setIsLoading] = useState(true);
    const [users,setUsers]=useState([]);
    const [fermiers,setFermiers]=useState([]);
    const [Farms,setFarms]=useState([]);
    const [userfermiers,setUserFermiers]=useState([]);
    const [UT,setUT]=useState([]);

    useEffect(()=>{
        axios.get("http://admin.laitespoir.com:8187/api/Societe/list")
        .then(res=>{
            console.log(res);
            setFarms(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);

    useEffect(()=>{
        axios.get("http://admin.laitespoir.com:8187/api/users/list")
        .then(res=>{
          setFermiers(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    }, []);
    const FarmsList = isLoading ? <option>Chargements des Farms ...</option> : Farms.length ? (
      Farms
          .map(user=>{
              return(
                <option selected>{user.name}</option>
              )
          })
      ): <h3>Aucun Fermier Trouvé !</h3>;
      const FermiersList = isLoading ? <option>Chargements des fermiers ...</option> : fermiers.length ? (
        fermiers
            .map(user=>{
                return(
                  <option selected>{user.name}</option>
                )
            })
        ): <h3>Aucun Fermier Trouvé !</h3>;

    const handleChange = (e) => {
      var keyword = document.getElementById("ValeurRechercheAffecter").value;
      if (keyword.length<1){
        console.log("Fergha");
        //axios.get("http://localhost:4000/users/")
        axios.get("http://admin.laitespoir.com:8187/api/users/list")
      .then(res=>{
        setUsers(res.data);
          setIsLoading(false);
      })
      .catch(err=>console.log)
      }else{
      var filtered_users = users;
        filtered_users=users.filter(user=>user.name.toLowerCase().includes(keyword.toLowerCase()));
        setUsers(filtered_users);
      }
      
}
function handleajout(idfermier,iduser){
    Swal.fire({
        title: "Vous etez sur?",
        text: "Veuillez Vérifier vos besoin avant de envoyé ",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: `Ajouter`,
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Success", "Votre fermier a été créé :) ", "success");
          console.log(idfermier,iduser);
          axios
            .post("http://143.110.210.169:4000/userfermiers/createuserfermiers", {
              //.post("http://localhost:4000/userfermiers/createuserfermiers", {
              idfermier: idfermier,
              iduser: iduser,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              Swal.fire("Ooops", "Une Erreur au niveau de l'ajout' ", "error");
              console.error(err);
            });
        } else {
          Swal.fire("Annulé", "Vous Avez Annulé l'ajout d'une fermier.", "error");
        }
      });
}
function handledelete(idfermier,iduser){
  Swal.fire({
      title: "Vous etez sur?",
      text: "Veuillez Vérifier vos besoin avant de envoyé ",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Oui, Supprimer`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        console.log(idfermier,iduser);
        axios
          //.delete("http://localhost:4000/userfermiers/deleteuserfermiers/"+idfermier+"/"+iduser)
          .delete("http://143.110.210.169:4000/userfermiers/deleteuserfermiers/"+idfermier+"/"+iduser)
          .then((res) => {
            Swal.fire("Success", "Vous avez supprimer cette fermier :) ", "success");
            console.log(res.data);
          })
          .catch((err) => {
            Swal.fire("Oops", "Une Erreur au niveau de la suppresion", "error");
            console.error(err);
          });
      } else {
        Swal.fire("Annulé", "Vous Avez Annulé la Suppresion.", "error");
      }
    });
}


function Ajouter(iduser){
let idfermier="";

const ValueList=fermiers.reduce((a, c) => {
  a[c._id] = c.Nom
  return a
 }, {});
    //axios.get("http://localhost:4000/userfermiers/"+iduser)
    axios.get("http://143.110.210.169:4000/userfermiers/"+iduser)
        .then(res=>{
            console.log(res);
            setUserFermiers(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)

Swal.fire({
        title: 'Ajouter Une Fermier',
        input: 'select',
        inputOptions: {ValueList},
        inputPlaceholder: 'Selectioner une fermier',
        showDenyButton: true,
        confirmButtonText: `Ajouter`,
        denyButtonText: `Non`,
        position:'top-start',
        inputValidator: function (value) {
          idfermier=value;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          handleajout(idfermier,iduser);
        } else {

          Swal.fire({title:"Vous Avez Annuler L'affectation d'une fermier",
          position:'bottom-end'});
        }
      });
}
function Supprimer(iduser){
  let idfermier="";
  let ValueList="";
    //axios.get("http://localhost:4000/userfermiers/listfermiers/"+iduser)
    axios.get("http://143.110.210.169:4000/userfermiers/listfermiers/"+iduser)
    .then(res=>{
        setUT(res.data);
        setIsLoading(false);
    })
    .catch(err=>console.log)
if (UT.length>0){
   ValueList=UT.reduce((a, c) => {
    a[c._id] = fermiers.find((fermier)=>{
      if(fermier._id == c.idfermier){
        return fermier.Nom;
      }
    })
    return a
   }, {});
}
    Swal.fire({
            title: 'Supprimer Une Fermier',
            input: 'select',
            inputOptions: {ValueList},
            inputPlaceholder: 'Selectioner une fermier a supprimer',
            showDenyButton: true,
            position:'top-start',
            confirmButtonText: `Supprimer`,
            denyButtonText: `Non`,
            inputValidator: (value) => {
              idfermier=value;
            }
          }).then((result) => {
            if (result.isConfirmed) {
              handledelete(idfermier,iduser);
            }else{
              Swal.fire({title:"Vous Avez Annuler la Supprision",
              position:'bottom-end'});
            }
          });
    }

    function handleValider(idfermier,iduser){
      Swal.fire({
          title: "Vous etez sur?",
          text: "Veuillez Vérifier vos besoin avant de envoyé ",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: `Oui, Valider`,
          denyButtonText: `Non`,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(idfermier);
            axios
              //.put("http://localhost:4000/fermiers/ValiderFermier/"+idfermier,{iduser:iduser})
              .put("http://143.110.210.169:4000/fermiers/ValiderFermier/"+idfermier,{iduser:iduser})
              .then((res) => {
                Swal.fire("Success", "Vous avez valider cette fermier :) ", "success");
                console.log(res.data);
              })
              .catch((err) => {
                Swal.fire("Oops", "Une Erreur au niveau de la validation", "error");
                console.error(err);
              });
          } else {
            Swal.fire("Annulé", "Vous Avez Annulé la validation.", "error");
          }
        });
    }
    function Valider(iduser){
      let idfermier="";
      let ValueList="";
       // axios.get("http://localhost:4000/userfermiers/listfermiers/"+iduser)
        axios.get("http://143.110.210.169:4000/userfermiers/listfermiers/"+iduser)
        .then(res=>{
            setUT(res.data);
            setIsLoading(false);
        })
        .catch(err=>console.log)
    if (UT.length>0){
       ValueList=UT.reduce((a, c) => {
        a[c.idfermier] = fermiers.find((fermier)=>{
          if(fermier._id == c.idfermier){
            return fermier.Nom;
          }
        })
        return a
       }, {});
    }
        Swal.fire({
                title: 'Valider Une Fermier',
                input: 'select',
                position:'top-start',
                inputOptions: {ValueList},
                inputPlaceholder: 'Selectioner une fermier a Valider',
                showDenyButton: true,
                confirmButtonText: `Valider`,
                denyButtonText: `Non`,
                inputValidator: (value) => {
                  idfermier=value;
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  handleValider(idfermier,iduser);
                }else{
                    Swal.fire({title:"Vous Avez Annuler la Validation",
                    position:'bottom-end'});
                }
              });
        }


    const UsersFermiers = isLoading ? (
      <div class="loader">
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
    </div> 
      ) : users.length ? (
        users.map((user) => {
          return (

            
    <div className="main-container">
      <div className="poster-container">
        <a href="#"><img src="https://cdn.discordapp.com/attachments/475963741616472074/859136696129683456/IMG_20210617_021024_482.jpg" className="poster"/></a>
      </div>
      <div className="ticket-container">
        <div className="ticket__content">
          <h4 className="ticket__movie-title">{user.name}</h4>
          <p className="ticket__movie-title">{user.email} <p className="ticket__current-price">{user.name}<br/></p></p>
          <button className="ticket__buy-btn  my-1 btn-sm btn-success px-4" onClick={(e) =>Valider(user._id)}><a href="javascript:void(0);" Style="color:white;text-decoration:None;">Valider <span className="btn-icon-left text-success"><i className="fa fa-check"></i></span></a>&nbsp;</button> 
           <button className="ticket__buy-btn my-1 btn-sm btn-info px-4" onClick={(e) =>Ajouter(user._id)}><a href="javascript:void(0);"   Style="color:white;text-decoration:None;">Ajouter <span className="btn-icon-left text-info"><i className="fa fa-plus-square"></i></span></a>&nbsp;</button> 
           <button className="ticket__buy-btn my-1 btn-sm btn-danger px-4" onClick={(e) =>Supprimer(user._id)}><a href="javascript:void(0);"  Style="color:white;text-decoration:None;">Supprimer <span className="btn-icon-left text-danger"><i className="fa fa-minus-square"></i></span></a>&nbsp;</button>
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
      <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <div class="toggle-sidebar" checked="checked"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>  <a href="javascript:void(0)"><strong>Affecter Des Femiers</strong></a></div>
              
              </li>
            </ol>
          </div>

          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">

                  <div className="form-group col-md-6">
              <label><strong>Choisire Fermier : </strong></label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-6 " id={"Fermier"}
                      name={"Fermier"}>

              {FermiersList}
</select>
            </div> 
            <div className="form-group col-md-6">
              <label><strong>Choisire Société :</strong></label><br></br>
              <select class="dropdown bootstrap-select show-tick form-control col-md-6 " id={"Farm"}
                      name={"Farm"}>

              {FarmsList}
</select>
            </div>
              
                  
                </div>
                
              </form>
              <button className="btn btn-primary" onClick={handleValider}>
              <strong><i className="fa fa-plus-square"></i> Affecter Fermier</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
}