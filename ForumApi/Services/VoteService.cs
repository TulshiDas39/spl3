using System;
using ForumApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ForumApi.Services
{
    public class VoteService
    {

        private readonly IMongoCollection<Vote> _votes;
        public VoteService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _votes = database.GetCollection<Vote>(settings.VotesCollectionName);
        }

        public Vote Get(string postId, string userId, string postType)
        {
            return _votes.Find<Vote>((item) =>
                item.userId == userId && item.postId == postId && item.postType == postType
            ).FirstOrDefault();
        }

        public Vote Get(string id)
        {
            return _votes.Find<Vote>(item => item.id == id).FirstOrDefault();
        }

        // public Vote InsertOne(Vote vote)
        // {
        //     var voteItem = Get(vote.postId, vote.userId, vote.postType);

        //     if (voteItem != null)
        //     {
        //         if (!IsSame(vote, voteItem)) return null;
        //         UpdateRatings(vote, 2);
        //         //voteItem.isUpvote = !voteItem.isUpvote;
        //         vote.id = voteItem.id;
        //         _votes.ReplaceOne(item => item.id == voteItem.id, vote);
        //         return vote;
        //     }
        //     else
        //     {
        //         UpdateRatings(vote, 1);
        //         _votes.InsertOne(vote);
        //         return vote;
        //     }

        // }

        public Vote InsertOne(Vote vote)
        {
            _votes.InsertOne(vote);
            return vote;
        }

        internal bool Exist(Vote vote)
        {
            var voteItem = Get(vote.postId, vote.userId, vote.postType);
            if (voteItem == null) return false;
            return true;
        }

        internal bool IsSame(Vote vote, Vote existingVote)
        {
            if (vote.isUpvote == existingVote.isUpvote) return false;
            return true;
        }

        internal bool IsSameVote(Vote vote)
        {
            var voteItem = Get(vote.postId, vote.userId, vote.postType);

            if (vote.isUpvote == voteItem.isUpvote) return true;
            return false;
        }

        public Vote Update(Vote newVote)
        {
            Vote exitingVote = Get(newVote.postId, newVote.userId, newVote.postType);
            exitingVote.isUpvote = !exitingVote.isUpvote;
            _votes.ReplaceOne(item => item.id == exitingVote.id, exitingVote);
            return exitingVote;
        }


    }
}