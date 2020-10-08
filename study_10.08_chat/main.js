// var ws = new WebSocket("ws://127.0.0.7:8080/ws/");
// $(document).ready(function () {
//   // if (localStorage.getItem("token") != null) {
//   //   goToMain();
//   // }
//   $("#loginButton").click(function (e) {
//     e.preventDefault();
//     $.ajax({
//       url: "http://127.0.0.1:8080/auth/",
//       type: "get",
//       data: {
//         username: $("#username").val(),
//         password: $("#password").val(),
//       },
//       success: function (response) {
//         // console.log(response['token']);
//         localStorage.setItem("token", response["token"]);
//         console.log(localStorage.getItem("token")); // read
//       },
//       error: function (xhr) {
//         console.log(xhr);
//       },
//     });
//   });
//   $("#send").click(function (e) {
//     e.preventDefault();
//     var message =
//       '{"action":"publish", "sessionID":"abc", "message":"hi all", "token":"' +
//       localStorage.getItem("token") +
//       '"}';
//     ws.send(message);
//   });
// });

// function goToMain() {
//   $("#login").hide();
//   $(".passwords").hide();
//   $("#main").show();
//   // var chat = $("#chat-messages");
//   // document.cookie = 'X-Authorization=' + localStorage.getItem("token") + '; path=/';
//   // chatContent = "";
//   var message =
//     '{"action":"subscribe", "sessionID":"abc", "message":"hi all", "token":"' +
//     localStorage.getItem("token") +
//     '"}';
//   console.log(message);
//   ws.onopen = () => {
//     console.log("Connected");
//   };
//   ws.onmessage = (msg) => {
//     // console.log("Server message:", msg.data);
//     ws.send(message);

//     ws.addEventListener("message", function (e) {
//       var msg = JSON.parse(e.data);

//       chatContent =
//         '<div class="chip">' +
//         "user" +
//         msg.action +
//         ": " +
//         msg.message +
//         "</div>" +
//         "</br>";
//       console.log(msg.clientID);
//       $("clientID").text = msg.clientID;
//       $("#chat-messages").append(chatContent);
//       var element = document.getElementById("chat-messages");
//       element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
//     });
//   };
//   ws.onclose = () => {
//     console.log("Disconnected");
//   };
//   // chat.apeend(chatContent);
// }

// // var ws = new WebSocket("ws://127.0.0.7:8080/ws/");
// // ws.onopen = () => {
// //   console.log("Connected");
// // };
// // ws.onmessage = (msg) => {
// //   console.log("Server message:", msg.data);
// // };
// // ws.onclose = () => {
// //   console.log("Disconnected");
// // };

// // window.ws = ws;

// // ws.send("hello server");
// // new Vue({
// //   el: "#app",

// //   data: {
// //     ws: null, // Our websocket
// //     newMsg: "", // Holds new messages to be sent to the server
// //     chatContent: "", // A running list of chat messages displayed on the screen
// //     username: null, // username address used for grabbing an avatar
// //     password: null, // Our password
// //     joined: false, // True if username and password have been filled in
// //   },

// //   created: function () {
// //     var self = this;
// //     this.ws = new WebSocket("ws://127.0.0.1:8080/ws");
// //     console.log("Attempting Connection...");
// //     this.ws.addEventListener("message", function (e) {
// //       var msg = JSON.parse(e.data);
// //       self.chatContent +=
// //         '<div class="chip">' +
// //         "user" +
// //         msg.username +
// //         ": " +
// //         msg.message +
// //         "</div>" +
// //         "</br>";
// //       var element = document.getElementById("chat-messages");
// //       element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
// //     });
// //   },
// //   methods: {
// //     send: function () {
// //       if (this.newMsg != "") {
// //         this.ws.send(
// //           JSON.stringify({
// //             username: this.username,
// //             password: this.password,
// //             message: $("<p>").html(this.newMsg).text(), // Strip out html
// //           })
// //         );
// //         this.newMsg = ""; // Reset newMsg
// //       }
// //     },

// //     join: function () {
// //       if (!this.username) {
// //         Materialize.toast("You must enter an username", 2000);
// //         return;
// //       }
// //       if (!this.password) {
// //         Materialize.toast("You must enter an password", 2000);
// //         return;
// //       }
// //       this.username = $("<p>").html(this.username).text();
// //       this.password = $("<p>").html(this.password).text();
// //       this.joined = true;
// //     },
// //     gravatarURL: function (username) {
// //       return "http://www.gravatar.com/avatar/" + CryptoJS.MD5(username);
// //     },
// //   },
// // });
