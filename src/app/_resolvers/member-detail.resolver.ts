import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/User.service";
import { Route } from "@angular/compiler/src/core";
import { AlertifyService } from "../_services/alertify.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService:UserService,private router:Router,
    private alertify:AlertifyService){}

    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).catch(error=>{
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        })
    }
}