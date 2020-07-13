using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;



        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    public List<Post> GetAll()
        {
            var All = _context.Post.Include(p => p.UserProfile).Include(p => p.Category).Where(p => p.IsApproved == true && p.PublishDateTime < DateTime.Now).OrderByDescending(p => p.PublishDateTime).ToList();
            return All;
        }

        public List<Post> GetByFirebaseUserId(string id)
        {
            return _context.Post.Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.UserProfile.FirebaseUserId == id)
                            .OrderBy(p => p.CreateDateTime)
                            .ToList();
        }

        //public Post GetById(int id)
        //{
        //    return _context.Post.Include(p => p.UserProfile)
        //                        .Include(p => p.Category)
        //                        .FirstOrDefault(p => p.Id == id);
        //}

        //public List<Post> GetByUserProfileId(int id)
        //{
        //    return _context.Post.Include(p => p.UserProfile)
        //                    .Include(p => p.Category)
        //                    .Where(p => p.UserProfileId == id)
        //                    .OrderBy(p => p.Title)
        //                    .ToList();
        //}



        //public void Add(Post post)
        //{
        //    _context.Add(post);
        //    _context.SaveChanges();
        //}

        //public void Update(Post post)
        //{
        //    _context.Entry(post).State = EntityState.Modified;
        //    _context.SaveChanges();
        //}

        //public void Delete(int id)
        //{
        //    var post = GetById(id);
        //    _context.Post.Remove(post);
        //    _context.SaveChanges();
        //}

        //public List<Post> Search(string criterion, bool sortDescending)
        //{
        //    var query = _context.Post
        //                        .Include(p => p.UserProfile)
        //                        .Include(p => p.Comments)
        //                        .Where(p => p.Title.Contains(criterion) || p.Caption.Contains(criterion));

        //    return sortDescending
        //        ? query.OrderByDescending(p => p.DateCreated).ToList()
        //        : query.OrderBy(p => p.DateCreated).ToList();
        //}

        //public List<Post> Hottest(string date)
        //{
        //    DateTime dateTime = DateTime.Parse(date);
        //    var query = _context.Post
        //                        .Include(p => p.UserProfile)
        //                        .Include(c => c.Comments)
        //                        .Where(p => p.DateCreated >= dateTime)
        //                        .ToList();
        //    return query;
        //}
    }
}