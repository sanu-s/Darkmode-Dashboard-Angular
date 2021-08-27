import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})


export class GraphComponent implements OnInit {
  type = 'AreaChart';
  data = []
  columnNames =  [
    "TotalProjects", 
    "Projects", 
    "Models"
  ];



  options = {
    colors: ['#43A047', 'red', 'yellow'],
    chartArea:{left:100, right:0,height:"70%", width:"90%"},
    title: '',
    pointSize:'',
    titleTextStyle:{
      color: 'gray'
    },
    hAxis: {title: ' Projects-Models',  titleTextStyle: {color: 'gray'},textStyle: {color: 'gray'}, gridlines:{color:'transparent'}},
    vAxis: {title: '', minValue: 0, gridlines:{color:'transparent'}, titleTextStyle: {color: 'gray'},textStyle: {color: 'gray'}},
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
  },
  backgroundColor: 'transparent',
  is3D: true
  };

  @Input('areagraphvalues')
  set areavalues(value: any) {
    this.options.pointSize = ''
    this.type = value?.type
    this.columnNames =  value?.data.columns
    this.data = value?.data.data
    this.options.vAxis.title = value.y_title
    this.options.hAxis.title = value.x_title
    // this.items = value
    // this.selected = value[0]
    console.log(value?.columns)
}

  @Input('linegraphvalues') 
  set linevalues(value: any) {
    this.options.pointSize = ''
    if(!this.data.length) {
    this.type = value?.type
    this.columnNames =  value?.data.columns
    this.data = value?.data.data
    this.options.vAxis.title = value.x_title
    this.options.hAxis.title = value.y_title
    this.options.chartArea = {left:100, right:0,height:"70%", width:"90%"},
    this.options.backgroundColor = 'transparent'
    // this.items = value
    // this.selected = value[0]
    this.options.hAxis.gridlines.color = 'transparent'
    this.options.vAxis.gridlines.color = 'transparent'
    if(this.data.length < 100){
    this.options.pointSize = '14'
    } else if (this.data.length < 150) {
      this.options.pointSize = '7'
    } else {
      this.options.pointSize = ''
    }

    // console.log(value)
    }

}

@Input('columngraphvalues') 
set columnvalues(value: any) {
  this.type = value?.type
  this.options.pointSize = ''
  this.columnNames =  value?.data.columns
  this.data = value?.data.data
  this.options.vAxis.title = value?.data.columns[1]
  this.options.hAxis.title = value?.data.columns[0]
  this.options.chartArea = {left:0, right:0,height:"90%", width:"90%"}
  // this.items = value
  // this.selected = value[0]
}


  constructor() { }

	ngOnInit() {
	
    }
}
