using System;

namespace ForumApi.Services
{
    public class DataService
    {
        public static readonly string[] englishStopWords = {
            "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "you're", "you've", "you'll", "you'd",
            "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "she's", "her", "hers",
            "herself", "it", "it's", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which",
            "who", "whom", "this", "that", "that'll", "these", "those", "am", "is", "are", "was", "were", "be", "been",
            "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if",
            "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between",
            "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out",
            "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why",
            "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not",
            "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "don't",
            "should", "should've", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain", "aren", "aren't", "couldn",
            "couldn't", "didn", "didn't", "doesn", "doesn't", "hadn", "hadn't", "hasn", "hasn't", "haven", "haven't",
            "isn", "isn't", "ma", "mightn", "mightn't", "mustn", "mustn't", "needn", "needn't", "shan", "shan't",
            "shouldn", "shouldn't", "wasn", "wasn't", "weren", "weren't", "won", "won't", "wouldn", "wouldn't"
            };

        public static readonly string[] bengaliStopWords = {
            "আমি","আমাকে","আমার","নিজে","নিজের","নিজেকে","আমরা","আমাদের","নিজেরা","নিজেদের","নিজেদেরকে","তুমি",
            "তোমার","তুমি","তোমরা","তোমাদের","তোমাদেরকে","সে","তাকে","তার",
            "এটি","এটির","এটিকে","তারা","তাদের","তাদেরকে","কী","কি","কিসের","কোনটি",
            "কে","কাকে","ঐটি","এইগুলো","ঐগুলো","এইগুলা","ঐগুলা","ছিল","হই","হবে","হয়েছে",
            "হচ্ছে","আছে","এবং","কিন্তু","যদি",
            "অথবা","কারণ","কারন","যেহেতু","যতক্ষন","পর্যন্ত","যখন","এর","দ্বারা","দারা","জন্য","সাথে","সম্পর্কে","বিরোদ্ধে","মধ্যে",
            "ভিতরে","থেকে",
            "কীভাবে","এখানে","সেখানে","কেন",
            "শুধু","তাই"
        };

    }
}