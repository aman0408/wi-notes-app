import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:notes_app/notes.dart';

class Login extends StatefulWidget {
  final int type;

  Login(this.type);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  var usernameController = TextEditingController();
  var passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final String title = widget.type == 0 ? "Signup" : "Login";
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(hintText: "Username"),
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(hintText: "Password"),
            ),
            SizedBox(
              height: 16,
            ),
            RaisedButton(
              onPressed: () async {
                //sign up
                print(usernameController.text);
                if (widget.type == 0) {
//                  var response = await http.post(
//                    "https://wi-notes-app.herokuapp.com/app/user",
//                    body: jsonEncode(<String, String>{
//                      "username": usernameController.text,
//                      "password": passwordController.text
//                    }),
//                  );
//                  print(json.decode(response.body));
                }
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (_) => Notes()));
              },
              child: Text(title),
            )
          ],
        ),
      ),
    );
  }
}
