import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "../../css/style.css";
import SideBar from "../SideBar";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { Bar, Doughnut, Line,Pie } from 'react-chartjs-2';  
export default function AjouterVache() {
    const data = {
        labels: [
            "Societés",
            "Fermiers",
            "Animals"
        ],
        options: { 
            legend: {
                labels: {
                    fontColor: "white",
                }
            }},
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
       };

    const Styles = {
     graphContainer: {
      border: '1px solid black',
      padding: '15px'
     }
    }
  let history = useHistory();
  return (
    
    <div Style="font-family: 'poppins', sans-serif;">
        
      <SideBar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid status_toggle middle sidebar-toggle"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> <a href="javascript:void(0)"><strong>Dashboard</strong></a>
              </li>
            </ol>
          </div>
          <div className="card-body">
            <div className="basic-form">
              <form>
                <div className="form-row">
                <div class="col-xl-3 col-lg-6 col-sm-6">
						<div class="widget-stat card">
							<div class="card-body p-4">
								<div class="media ai-icon">
									<span class="mr-3 bgl-primary text-primary">
								 <i class="fa fa-building"></i>
									
									</span>
									<div class="media-body">
										<p class="mb-1">Sociétés</p>
										<h4 class="mb-0">3280</h4>
										<span class="badge badge-primary">+3.5%</span>
									</div>
								</div>
							</div>
						</div>
                    </div>

                    <div class="col-xl-3 col-lg-6 col-sm-6">
                        <div class="widget-stat card">
							<div class="card-body p-4">
								<div class="media ai-icon">
									<span class="mr-3 bgl-warning text-warning">
										<i className="fa fa-user"></i>
									</span>
									<div class="media-body">
										<p class="mb-1">Fermiers</p>
										<h4 class="mb-0">2570</h4>
										<span class="badge badge-warning">+3.5%</span>
									</div>
								</div>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
                        <div class="widget-stat card">
							<div class="card-body  p-4">
								<div class="media ai-icon">
									<span class="mr-3 bgl-danger text-danger">
                                    <i className="fa fa-paw"></i>
									</span>
									<div class="media-body">
										<p class="mb-1">Vaches</p>
										<h4 class="mb-0">364.50K</h4>
										<span class="badge badge-danger">-3.5%</span>
									</div>
								</div>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
                        <div class="widget-stat card">
							<div class="card-body p-4">
								<div class="media ai-icon">
									<span class="mr-3 bgl-success text-success">
                                    <i className="fa fa-paw"></i>
									</span>
									<div class="media-body">
										<p class="mb-1">Veaux</p>
										<h4 class="mb-0">364.50K</h4>
										<span class="badge badge-success">-3.5%</span>
									</div>
								</div>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
								<div class="widget-stat card "Style="background-color:#6418c3;color:white;">
									<div class="card-header border-0 pb-0">
										<h3 class="card-title text-white">Total Societés</h3>
										<h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 422</h5>
									</div>
									<div class="card-body text-center">
										<div class="ico-sparkline">
											<div id="sparkline12"><Pie data={data} /></div>
										</div>
									</div>
								</div>
							</div>
                           
                            <div class="col-xl-3 col-lg-6 col-sm-6">
								<div class="widget-stat card " Style="background-color:#ffab2d;color:white;">
									<div class="card-header border-0 pb-0">
										<h3 class="card-title text-white">Total Fermiers</h3>
										<h5 class="text-white mb-0"><i class="fa fa-caret-up"></i> 422</h5>
									</div>
									<div class="card-body text-center">
										<div class="ico-sparkline">
											<div id="sparkline12"><Doughnut data={data} /></div>
										</div>
									</div>
								</div>
							</div>
                            <div class="col-xl-3 col-lg-6 col-sm-6">
								<div class="widget-stat card " Style="background-color:#fff0f0;color:black;">
									<div class="card-header border-0 pb-0">
										<h3 class="card-title text-black">Total Vaches</h3>
										<h5 class="text-black mb-0"><i class="fa fa-caret-up"></i> 422</h5>
									</div>
									<div class="card-body text-center">
										<div class="ico-sparkline">
											<div id="sparkline12"><Line data={data} /></div>
										</div>
									</div>
								</div>
							</div>
                            <div class="col-xl-3 col-lg-6 col-sm-6">
								<div class="widget-stat card" Style="background-color:#e7faec;color:black;">
									<div class="card-header border-0 pb-0">
										<h3 class="card-title text-black">Total Veauxs</h3>
										<h5 class="text-black mb-0"><i class="fa fa-caret-up"></i> 422</h5>
									</div>
									<div class="card-body text-center">
										<div class="ico-sparkline">
											<div id="sparkline12"><Bar data={data} /></div>
										</div>
									</div>
								</div>
							</div>
                            <div class="col-xl-3 col-lg-6 col-sm-6">
						<div class="widget-stat card">
							<div class="card-body p-4">
								<h4 class="card-title">New Societés</h4>
								<h3>3280</h3>
								<div class="progress mb-2">
									<div class="progress-bar progress-animated bg-primary" Style="width: 80%"></div>
								</div>
								<small>80% Increase in 20 Days</small>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
						<div class="widget-stat card">
							<div class="card-body p-4">
								<h4 class="card-title">New Fermiers</h4>
								<h3>245</h3>
								<div class="progress mb-2">
									<div class="progress-bar progress-animated bg-warning" Style="width: 50%"></div>
								</div>
								<small>50% Increase in 25 Days</small>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
						<div class="widget-stat card">
							<div class="card-body p-4">
								<h4 class="card-title">New Vaches</h4>
								<h3>28</h3>
								<div class="progress mb-2">
									<div class="progress-bar progress-animated bg-red" Style="width: 76%"></div>
								</div>
								<small>76% Increase in 20 Days</small>
							</div>
						</div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-sm-6">
						<div class="widget-stat card">
							<div class="card-body p-4">
								<h4 class="card-title">New Veaux</h4>
								<h3>25160$</h3>
								<div class="progress mb-2">
									<div class="progress-bar progress-animated bg-success" Style="width: 30%"></div>
								</div>
								<small>30% Increase in 30 Days</small>
							</div>
						</div>
                    </div>
                  </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
