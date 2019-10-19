import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServicesService } from '../../shared/services/User/user-services.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: string;
    symbol: string;
    IP: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Gustavo Solares', weight: 'Ciudad Guatemala', symbol: 'Computadora Portatil', IP: '190.148.39.151' },
    { position: 2, name: 'Ricardo Gonzalez', weight: 'Ciudad Guatemala', symbol: 'Computadora de escritorio',IP: '190.148.39.143'  }
    
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol', 'IP'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor() {
      
    }

    ngOnInit() {}
}
