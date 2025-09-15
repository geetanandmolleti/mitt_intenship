import 'package:get/get.dart';
import 'package:my_blog_app/app/data/providers/post_provider.dart';

class PostEditorController extends GetxController {
  final PostProvider _postProvider = PostProvider();

  // Observable variables for reactive UI updates
  var title = ''.obs;
  var content = ''.obs;
  var isLoadingAi = false.obs;
  var aiSuggestion = ''.obs;
  var errorMessage = ''.obs;

  // Method to call the backend AI service
  void fetchAiSuggestion() async {
    if (title.value.isEmpty) {
      Get.snackbar("Error", "Please enter a title first.");
      return;
    }
    
    isLoadingAi.value = true;
    errorMessage.value = '';
    aiSuggestion.value = '';

    try {
      final suggestion = await _postProvider.getAiContentSuggestion(title.value);
      aiSuggestion.value = suggestion;
    } catch (e) {
      errorMessage.value = e.toString();
      Get.snackbar("AI Error", "Could not generate suggestion.");
    } finally {
      isLoadingAi.value = false;
    }
  }

  void useSuggestion() {
    content.value = '${content.value} ${aiSuggestion.value}';
    aiSuggestion.value = ''; // Clear suggestion after using it
  }
}
