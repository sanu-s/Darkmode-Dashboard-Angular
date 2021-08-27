import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../../../core/_services';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    loginView = true
    authkey;
    user;
    quote;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, private userService: UserService,
    ) {
        // redirect to home if already logged in
        // this.authkey = this.route.snapshot.params['auth'];
        this.userService.getUser().subscribe(x => {
            this.user = x;
            if(x) {
            this.returnUrl = this.user.is_admin? '/admin':'/projects';
            if (x.is_admin) {
                if (this.authenticationService.currentUserValue) {
                    this.router.navigate(['/admin']);
                }
            } else if (this.authenticationService.currentUserValue) {
                this.router.navigate(['/projects']);
            } else {
                
            }
        } else {
            this.router.navigate(['/']);
           
        }
        })
        this.route.queryParams.subscribe(params => {
            this.authkey = params['auth'];
        });

        if(!this.authenticationService.currentUserValue){
            this.authenticationService.quote().subscribe(x=>{
                this.quote = x;
            })
        }
    }

    

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            password2: ['']
        });

        // get return url from route parameters or default to '/'
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        if (this.loginView && !this.authkey) {
            this.submitted = true;

            // stop here if form is invalid
            if (this.loginForm.invalid) {
                return;
            }

            this.authenticationService.login(this.f.username.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.userService.details('GET').subscribe(x => {
                            this.userService.sendUser(x)
                            this.user = x
                            this.returnUrl = this.user.is_admin? '/admin':'/projects';
                            if (x.is_admin) {
                                if (this.authenticationService.currentUserValue) {
                                    this.router.navigate(['/admin']);
                                }
                            } else if (this.authenticationService.currentUserValue) {
                                this.router.navigate(['/projects']);
                            } else {
                                this.router.navigate(['/']);
                            }
                        })

                    });
        } else if (!this.loginView && !this.authkey) {
            this.authenticationService.resetPassword('POST', { email: this.f.username.value }).subscribe(x => {
                this.router.navigate(['/']);
         
                this.loginView = true
            },
);
        } else {
            let data = {
                key: this.authkey,
                password1: this.f.password.value,
                password2: this.f.password.value
            }
            this.authenticationService.resetPassword('PUT', data).subscribe(x => {
                // this.authenticationService.logout().subscribe(()=>{});
                // this.router.navigate(['/']);
                this.loginView = true
            },
            );
        }
    }


}