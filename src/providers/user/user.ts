import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlProvider} from "../url/url";
import {HttpClientModule} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {Storage} from "@ionic/storage";

import {TabsPage} from "../../pages/tabs/tabs";
import {RequestProvider} from "../request.service";
import {tap} from "rxjs/operators";
import {UtilityProvider} from "../utility/utility";

@Injectable()
export class UserProvider {

  constructor(private http: HttpClient,
              private request: RequestProvider,
              private url: UrlProvider,
              public util: UtilityProvider,
              public storage: Storage) {
  }

  @Output() dataChange = new EventEmitter<boolean>();

  setUser(data) {
    this.storage.set('phone', data.phone);
    data.phone = '+380 ' +
      data.phone.toString().substring(0, 2) +
      ' ' + data.phone.toString().substring(2, 4) +
      ' ' + data.phone.toString().substring(4, 6) +
      ' ' + data.phone.toString().substring(6);
    data.profile = {};
    data.profile.first_name = data.first_name;
    data.profile.last_name = data.last_name;
    data.profile.email = data.email;
    data.profile.city = data.city;
    data.profile.passport_id = data.passport_id;
    this.storage.set('user', data);
  }

  getPhone() {
    return this.storage.get('phone')
  }

  getUser() {
    return this.storage.get('user')
  }

  contacktSupport(data) {
    return this.request.post(this.url.support, data).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('Помілка, повідомлення не відправлено', 'error');
          console.log(err)
        })
    )
  }

  changePass(data) {
    return this.request.post(this.url.changePass, data).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('Помілка, пароль не змінено', 'error');
          console.log(err)
        })
    )
  }

  firstEnter() {
    return {
      setTrue: () => {
        this.storage.set('firstEnter', 'Unfinished');
      },
      setFalse: () => {
        this.storage.set('firstEnter', 'Finished');
        this.dataChange.emit(false);
      },
      get: () => {
        return this.storage.get('firstEnter').then((data) => {
          return data;
        });
      }
    }
  }

  getProfile() {
    return this.request.get(this.url.profile)
      .pipe(
        tap(
          () => {
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )
  }

  setProfile(data: any) {
    return this.request.post(this.url.setProfile, data)
      .pipe(
        tap(
          (res: any) => {
            this.setUser(res);
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )
  }

  addSkills(data: any) {
    return this.request.post(this.url.addSkills, data)
      .pipe(
        tap(
          () => {
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )
  }

  deleteSkills(data: any) {
    return this.request.post(this.url.deleteSkills, data)
      .pipe(
        tap(
          () => {
          },
          (err) => {
            this.util.toast('error', 'error');
            console.log(err)
          })
      )

  }

  updateSkill(id: number, data: any) {
    return this.request.post(this.url.updateSkill + id, data).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  userSkills() {
    return this.request.get(this.url.mySkills).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };

  myJobs() {
    return this.request.get(this.url.myjobs).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };

  applyForJob(id: any) {
    return this.request.post(this.url.applyForJob, {
      job_id: id
    }).pipe(
      tap(
        () => {
          this.util.toast('Вашу заявку щодо даної пропозиції подано', 'success');
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  escapeJob(id: any) {
    return this.request.get(this.url.escapeJob + id).pipe(
      tap(
        () => {
          this.util.toast('Вашу заявку щодо даної пропозиції відхилено', 'success');
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  myFriends() {
    return this.request.get(this.url.friendsAll).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };

  friendRequests() {
    return this.request.get(this.url.friends.requests).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }
  deleteMyFriends(id: any) {
    return this.request.post(this.url.friends.deleteMyFriends, {
      user_id: id
    }).pipe(
      tap(
        (res) => {
          this.util.toast('Контакт видалено', 'success')
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  }

  friendRequestsDecline(id) {
    return this.request.get(this.url.friends.action + id + this.url.friends.decline).pipe(
      tap(
        () => {
          this.util.toast('Заявку відхилено', 'success');
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };

  friendRequestsAccept(id) {
    return this.request.get(this.url.friends.action + id + this.url.friends.accept).pipe(
      tap(
        () => {
          this.util.toast('Заявку підтверджено', 'success');
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };

  friendRequestSend(numbers) {
    return this.request.post(this.url.friends.send, {
      phone: numbers
    }).pipe(
      tap(
        () => {
        },
        (err) => {
          this.util.toast('error', 'error');
          console.log(err)
        })
    )
  };


}
