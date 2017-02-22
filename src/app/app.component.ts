import { Component, OnInit } from '@angular/core';
import { initializeApp, database, app } from 'firebase';
var _ = require('underscore');
// import { _ } from 'underscore.js';
// import * as _ from 'underscore';
const config = {
  apiKey: "AIzaSyBhg6wpEhmXL_tCaRHfLeEFEwHmhLDXLF8",
  authDomain: "people-82905.firebaseapp.com",
  databaseURL: "https://people-82905.firebaseio.com",
  storageBucket: "people-82905.appspot.com",
  messagingSenderId: "96247822155"
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  messages = [];
  snap = [];
  _newcomplaint: string = null;
  _ifNewComplaint: boolean = false;
  _isAuthenticated: boolean = false;
  loading_text ="Loading messages..."
  ngOnInit() {

    initializeApp(config);
    database().ref('people/thoibi').limitToLast(50).on('value', (snap) => {
      //  this.messages = snap.val();
      // this.messages = _.values(snap.val());
      console.log(snap.val());
      this.messages = [];
      _.each(snap.val(), (value, key) => {
        this.messages.push({ key: key, value, comments: _.values(value.comments) });
      });
      // _.sort()
      if(!this.messages.length)
      this.loading_text = " 👅 No messages! Tap (+) to add message, if you have the passcode";
      if (!this.messages.length && this._isAuthenticated)
        this._ifNewComplaint = true;
      console.log(this.messages);
    });
  }
  /*messages = [
    {
      msgid: 1,
      text: "Ei ngasi thawai yam nungaite1",
      time: "4:15 AM, Feb 15, 2017",
      location: "",
      like_count: 10,
      comments: [
        "Karigi?", "Kamai tourino1"
      ]
    },
    {
      msgid: 2,
      text: "Ei ngasi thawai yam nungaite2",
      time: "4:15 AM, Feb 15, 2017",
      location: "",
      like_count: 10,
      comments: [
        "Karigi?", "Kamai tourino2"
      ]
    },
    {
      msgid: 3,
      text: "Ei ngasi thawai yam nungaite3",
      time: "4:15 AM, Feb 15, 2017",
      location: "",
      like_count: 10,
      comments: [
        "Karigi?", "Kamai tourino3"
      ]
    },
  ]*/
  msgindex: number;
  showComments(index: number) {
    console.log(index);
    this.msgindex = index;
  }
  addComment(key, text: string) {
    // console.log(text);
    // this.messages[this.msgindex].comments.push().;
    // this.snap.
    database().ref('/people/thoibi/' + key).child('comments').push(text)
  }
  fav(key, lastval: number) {
    // console.log(i);
    // this.messages[i].like_count += 1;
    // console.log(this.messages[i].like_count);
    // database().ref('/people/thoibi').pus
    database().ref('/people/thoibi/' + key).child('like_count').set(lastval + 1);
  }
  addComplaint(text: string) {
    if (!text.length)
      return
    this._newcomplaint = text;
    let msg = {
      msgid: 4,
      text: text,
      time: Date.now(),
      location: '',
      like_count: 0,
      comments: []
    }
    database().ref('/people').child('thoibi').push(msg)
      // .set(msg)
      .then((res) => {
        this._newcomplaint = null;
        this._ifNewComplaint = !this._ifNewComplaint;
        // this.messages.push(msg);
      })
  }
  toggleNewComplaint() {

    this._ifNewComplaint = !this._ifNewComplaint;
  }
  authenticate(pass: number){
    if(pass == 125)
      this._isAuthenticated = true;
  }
}
