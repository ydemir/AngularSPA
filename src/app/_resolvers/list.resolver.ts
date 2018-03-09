import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import { UserService } from "../_services/User.service";
import { Route } from "@angular/compiler/src/core";
import { AlertifyService } from "../_services/alertify.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'

@Injectable()
export class ListsResolver implements Resolve<User[]>{
    pageSize = 5;
    pageNumber = 1;
    likesParam='Likers';

    constructor(private userService: UserService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize,null,this.likesParam).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        });
    }
}