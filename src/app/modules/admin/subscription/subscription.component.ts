import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/_services'
import { ActivatedRoute } from '@angular/router';
import { admin_config } from '../../../core/_config'
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs' ;




@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})


export class SubscriptionComponent implements OnInit {
  subs
  immediate = false;
  plan = admin_config.plan
  model_quality = admin_config.model_quality
  form: FormGroup
  id;
  selected_sub;
  user
  activities
  upcoming_subs = []
  lineChart = {type:'LineChart', data:[],x_title:'',y_title:'' }
  areaChart = {type:'AreaChart',data:[], x_title:'',y_title:''}

  constructor(private userservice: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      action: ['change'],
      immediate: [false],
      plan: ['BASIC'],
      project_count: ["1"],
      model_quality: ["1"],
    });
    this.userservice.getUser().subscribe(x => {
      this.user = x
      this.activatedRoute.params.subscribe(params => {
        if(!this.id) {
        this.id = params['id']

        this.getAccount()
        if(this.user.is_admin) {
          this.activity()
        }
      
    }
      });
    })
  }


  ngOnInit(): void {
    console.log(this.user)

  }

  getAccount()
  {
    this.userservice.account('GET', this.id).subscribe(x => {
      this.subs = x
      this.get_upcoming_subs(x)
      this.areaChart.data = x.project_model_chart
      this.areaChart.x_title = 'Project Models'
      this.areaChart.y_title = 'Model Usage'

      this.lineChart.data = x.app_usage_chart 
      this.lineChart.x_title = 'Activities'
      this.lineChart.y_title = 'Date'                                                                                                                                                            
    })
  }

  localTime(date) {
    return new Date(date)
  }

  get_upcoming_subs(x){
    this.upcoming_subs = []
    if(x?.timeline){
    for(let us of x?.timeline) {
      if(us.status === 'upcoming')
      this.upcoming_subs.push({id:us.id, value:`${us.plan} - ${us.start_at}`})
      }
    }
  }
  submit(type) {
    let data;
    let method = 'PUT'
    if (type == 'change') {
      let dat = this.form.value
      if(this.form.controls.plan.value !== 'CUSTOM') {
        delete dat.project_count
        delete dat.model_quality
      }
      data = { id: this.id, ...dat}
    }
    else if (type == 'reactive') {
      data = { id:this.id, action:'reactivate', immediate: this.immediate }
    } else {
      method = 'DELETE'
      data = {user_id : this.id, subscription_id: this.selected_sub}
    }
    this.userservice.account(method, data).subscribe(x => {

      this.subs = x
      this.get_upcoming_subs(x)
      this.immediate = false;
    })
  }

  activity(format = 'json'){
    this.userservice.activity(this.id, format).subscribe((x:any)=>{
      if(format === 'csv'){
        const blob = new Blob([x], {type: 'text/csv'});
        const dataURL = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = dataURL
        a.download = 'activities.csv';
        // start download
        a.click();
      } else {
        this.activities = x;
      }
    })
  }


  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = false;
  size: number = 40;
  expandEnabled: boolean = true;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';

  entries = [
    {
      header: 'header',
      content: 'content'
    }
  ]

  addEntry() {
    this.entries.push({
      header: 'header',
      content: 'content'
    })
  }

  removeEntry() {
    this.entries.pop();
  }

  onHeaderClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onDotClick(event) {
    if (!this.expandEnabled) {
      event.stopPropagation();
    }
  }

  onExpandEntry(expanded, index) {
    console.log(`Expand status of entry #${index} changed to ${expanded}`)
  }

  toggleSide() {
    this.side = this.side === 'left' ? 'right' : 'left';
  }

}
