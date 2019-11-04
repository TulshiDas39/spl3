using System.Linq;
using Serilog;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;


namespace ForumApi.Services
{
    public class Utility
    {
        public static bool hasCommon(string userTags, string questionTags)
        {
            string[] uTags = Tokenize(userTags);
            string[] qTags = Tokenize(questionTags);
            Log.Information("all uTags:");
            foreach (string s in uTags)
            {
                //Log.Information("uTags item:" + s);
            }


            foreach (string qTag in qTags)
            {
                //Log.Information("qTag:" + qTag);
                if (uTags.Contains(qTag)) { return true; };
            }

            return false;
        }

        public static string[] Tokenize(string input)
        {
            string pattern = "\\s+";
            return Regex.Split(input, pattern);
        }

        public static string ArrayToString(IEnumerable<string> words)
        {
            string str = "";
            foreach (string word in words)
            {
                str += word + " ";
            }
            return str;
        }
    }


}