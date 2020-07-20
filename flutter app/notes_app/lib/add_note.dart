import 'package:flutter/material.dart';

class AddNote extends StatefulWidget {
  @override
  _AddNoteState createState() => _AddNoteState();
}

class _AddNoteState extends State<AddNote> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Add a Note"),
      ),
      body: Column(
        children: [
          TextField(
            maxLines: 5,
          ),
          RaisedButton(
            onPressed: (){
              Navigator.pop(context);
            },
            child: Text("Add"),
          )
        ],
      ),
    );
  }
}
