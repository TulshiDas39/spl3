using System.Linq;

namespace ForumApi.Services
{
    public class Utility
    {
        // public int hasCommon(string[] a1, string[] a2){
        //     foreach(string item in a1){
        //         if(a2.Contains())
        //     }
        // }
        public static bool hasCommon(string userTags, string questionTags)
        {
            string[] uTags = userTags.Trim().Split(@"\s+");
            string[] qTags = questionTags.Trim().Split(@"\s+");
            foreach (string qTag in qTags)
            {
                if (uTags.Contains(qTag)){ return true;};
            }

            return true;
        }
    }
}