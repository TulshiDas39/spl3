using System.Linq;
using Serilog;
using System.Text.RegularExpressions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;


namespace ForumApi.Services
{
    public class Utility
    {
        public static ServiceProvider getLoggerServiceProvider(){
           return new ServiceCollection().AddLogging(cfg => cfg.AddConsole()).Configure<LoggerFilterOptions>(cfg => cfg.MinLevel = LogLevel.Debug).BuildServiceProvider();
        }
        public static bool hasCommon(string userTags, string questionTags)
        {
            string[] uTags = GetWords(userTags);
            string[] qTags = GetWords(questionTags);
            Log.Information("all uTags:");
            foreach (string s in uTags)
            {
                Log.Information("uTags item:" + s);
            }


            foreach (string qTag in qTags)
            {
                Log.Information("qTag:" + qTag);
                if (uTags.Contains(qTag)) { return true; };
            }

            return false;
        }

        public static string[] GetWords(string input)
        {
            MatchCollection matches = Regex.Matches(input, @"\b[\w']*\b");

            var words = from m in matches.Cast<Match>()
                        where !string.IsNullOrEmpty(m.Value)
                        select TrimSuffix(m.Value);

            return words.ToArray();
        }

        private static string TrimSuffix(string word)
        {
            int apostropheLocation = word.IndexOf('\'');
            if (apostropheLocation != -1)
            {
                word = word.Substring(0, apostropheLocation);
            }

            return word;
        }
    }


}