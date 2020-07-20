import 'package:flutter/material.dart';
import 'package:notes_app/add_note.dart';

class Notes extends StatefulWidget {
  @override
  _NotesState createState() => _NotesState();
}

class _NotesState extends State<Notes> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Notes"),
      ),
      body: ListView.builder(
        itemBuilder: (_, index) {
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500"),
            ),
          );
        },
        itemCount: 4,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (_) => AddNote()));
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
