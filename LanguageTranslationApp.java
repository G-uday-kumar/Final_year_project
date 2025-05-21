import java.util.*;

public class LanguageTranslationApp {

    // Method to perform translation
    public static String translate(String input, Map<String, String> translationMap) {
        // Normalize input (trim spaces, remove unwanted punctuation if needed)
        String normalizedInput = input.trim();

        // Perform comparison with stored map keys
        for (String key : translationMap.keySet()) {
            if (normalizedInput.equalsIgnoreCase(key)) {
                return translationMap.get(key);
            }
        }
        return "Translation not found.";
    }

    public static void main(String[] args) {
        // Input examples
        String[] inputs = {
            "Nanage pencil bekagide, can you give it to me?",
            "Avaru office-ige hodaru, but he forgot his tiffin box.",
            "Eega time estu?"
        };

        // Mapping inputs to translations (string comparison and lookup)
        Map<String, String> translationMap = new HashMap<>();
        translationMap.put("Nanage pencil bekagide, can you give it to me?", 
                           "I want pencil, can you give it to me?");
        translationMap.put("Avaru office-ige hodaru, but he forgot his tiffin box.", 
                           "He went to office, but he forgot his tiffin box.");
        translationMap.put("Eega time estu?", 
                           "What is the time now?");
        translationMap.put("ninge ehtu Age?","how old you are");

        // Display menu and perform translation
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the sentence to translate:");
        String userInput = scanner.nextLine();

        String translation = translate(userInput, translationMap);
        System.out.println("Translated Sentence: " + translation);

        scanner.close();
    }
}
