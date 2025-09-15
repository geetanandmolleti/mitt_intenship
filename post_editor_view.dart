import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'post_editor_controller.dart';

class PostEditorView extends GetView<PostEditorController> {
  const PostEditorView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Create Post')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextField(
                decoration: InputDecoration(labelText: 'Title'),
                onChanged: (value) => controller.title.value = value,
              ),
              SizedBox(height: 16),
              // AI Helper Section
              ElevatedButton.icon(
                icon: Icon(Icons.auto_awesome),
                label: Text('Generate Intro with AI'),
                onPressed: controller.fetchAiSuggestion,
              ),
              // Reactive widget to show loading indicator or suggestion
              Obx(() {
                if (controller.isLoadingAi.value) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CircularProgressIndicator(),
                  );
                }
                if (controller.aiSuggestion.value.isNotEmpty) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 12.0),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
      
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            controller.aiSuggestion.value,
                            style: TextStyle(fontStyle: FontStyle.italic),
                          ),
                          SizedBox(height: 8),
                          Align(
                            alignment: Alignment.centerRight,
                            child: TextButton(
                              onPressed: controller.useSuggestion,
                              child: Text('Use this'),
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                }
                return SizedBox.shrink(); // Show nothing otherwise
              }),
              SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(labelText: 'Content'),
                maxLines: 10,
                // You would use a rich text editor package here in a real app
                onChanged: (value) => controller.content.value = value,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
