import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../vendor/bootstrap/bootstrap.css';
import '../../css/style.css'; 
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
export default function Login() {
    let history = useHistory();
    const [User, setUser] = useState({
        Email:"Nom",
        Password: "2021-09-18T13:14:36.136Z"
      });
      function Verif(){
        if((document.getElementById("Email").value=="")
      ||(document.getElementById("Password").value=="")
      ){
      return false
        }
        else{
          return true
        }     
      }
      const handleClick = (e) => {
        if(Verif()){
        Swal.fire({
          title: "Vous etez sur?",
          text: "Veuillez Vérifier vos besoin avant de envoyé ",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: `Ajouter`,
          denyButtonText: `Non`,
        }).then((result) => {
          if (result.isConfirmed) {
            User.Email=document.getElementById("Email").value;
            User.Password = document.getElementById("Password").value;
            console.log({ User });
    
            e.preventDefault();
            axios
                .post("http://localhost:8187/api/User/Login/find", {
                    Email:  User.Email,
                    Password: User.Password  
              })
              .then((res) => {
                Swal.fire("Success", "Utilisateur Trouvé :) ", "success");
                console.log(res.data);
                history.push("/Dashboard");
              })
              .catch((err) => {
                Swal.fire("Ooops", "Une Erreur au niveau de la requette", "error");
                console.error(err);
              });
          } else {
            Swal.fire("Annulé", "Vous Avez Annulé l'authentification.", "error");
          }
        });
      }else{
        Swal.fire("Erreur", "Veuillez remplire tous les champs .", "error");
      }
      };
    return (
        <div  Style="background:#f8f9fe;width:100%;height:100%;position: absolute; top: 0; left: 0;">
        <div className="container" >
            <div className="row justify-content-center  align-items-center">
                <div className="col-md-5">
                <img className="img-fluid mt-4 mb-4 " src="https://cdn.discordapp.com/attachments/872812355044646932/888612820369956954/pngwing.com.png" alt=""/>
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
                                    <h4 className="text-center mb-4">Connecter Avec Votre Compte SIVFARM</h4>
                                    <form>
                                        <div className="form-group">
                                            <label className="mb-1">Email :</label>
                                            <input type="email" className="form-control" placeholder="Votre Adress E-mail" Style="background:#f3f3ff;" id="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1">Mot de pass :</label>
                                            <input type="password" className="form-control"placeholder="Votre mot de Pass" Style="background:#f3f3ff;" id="Password"/>
                                        </div>
                                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div className="form-group">
                                               
                                            </div>
                                            
                                        </div>
                                        <div className="text-center">
                                            <button type="button" className="btn btn-primary btn-block col-6" Style="background:#7366ff;" onClick={handleClick}>Connecter</button>
                                        </div>
                                        <div className="copyright orm-row d-flex justify-content-between mt-4 mb-2">
					<p><strong>SIV - Farm Dashboard</strong> © 2021 All Rights Reserved</p>
				</div>
                                    </form>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
    </div>

    );
} 
