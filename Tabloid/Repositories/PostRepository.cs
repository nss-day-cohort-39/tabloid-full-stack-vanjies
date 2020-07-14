using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories {
    public class PostRepository {
        private readonly ApplicationDbContext _context;

        public PostRepository (ApplicationDbContext context) {
            _context = context;
        }
        public List<Post> GetAll () {
            var All = _context.Post.Include (p => p.UserProfile).Include (p => p.Category).Where (p => p.IsApproved == true && p.PublishDateTime < DateTime.Now).OrderByDescending (p => p.PublishDateTime).ToList ();
            return All;
        }

        public void Add (Post post) {
            _context.Add (post);
            _context.SaveChanges ();
        }

        public Post GetById (int id) {
            return _context.Post.Include (p => p.UserProfile)
                .Include (p => p.Category)
                .FirstOrDefault (p => p.Id == id);
        }

        public List<Post> GetByFirebaseUserId (string id) {
            return _context.Post.Include (p => p.UserProfile)
                .Include (p => p.Category)
                .Where (p => p.UserProfile.FirebaseUserId == id)
                .OrderBy (p => p.CreateDateTime)
                .ToList ();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}