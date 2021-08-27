import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProjectService} from '../../../core/_services'
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  DataType: string
  Index: string
  Maximum: string
  Mean: string
  Median: string
  Minimum: string
  Missing: string
  Name: string
  StandardDeviation: string
  TotalValues: string

}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectDetailsComponent implements OnInit {
  dataSource;
  project;
  lineChart = {type:'AreaChart', data:[],x_title:'',y_title:'' }
  showChart = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input('opened')
  set openvalue(value:any){
    if(value){
      this.project = value
      this.dataSource = new MatTableDataSource(value?.statistics);
      this.dataSource.paginator = this.paginator;
    }
  }

  columnsToDisplay = ['Index','Name','DataType', 'Maximum', 'Mean', 'Median', 'Minimum', 'Missing', 'StandardDeviation', 'TotalValues'];
  expandedElement;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private ps:ProjectService) { }

  ngOnInit(): void {
  }


  showGraph(feature){
    console.log(this.expandedElement)
    if(this.expandedElement){
    this.showChart = false;
    this.ps.chart(this.project.id,feature).subscribe(x=>{
      if(x.data.length <= 10) {
        this.lineChart.type = 'ColumnChart'
      } else {
        this.lineChart.type = 'AreaChart'
      }
      this.lineChart.data = x
      this.lineChart.x_title = x?.columns[0]
      this.lineChart.y_title = x?.columns[1] 
      this.showChart=true;
    })
  }
  }


}
