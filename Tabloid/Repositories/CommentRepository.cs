
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetAll()
        {
            return _context.Comment 
                .Include(c => c.UserProfile) 
                .Include(c => c.Post) 
                .ThenInclude(p => p.UserProfile) 
                .ToList(); 
        }

        public Comment GetById(int id)
        {
            return _context.Comment
                .Include(c => c.UserProfile)
                .Include(c => c.Post)
                .ThenInclude(p => p.UserProfile)
                .FirstOrDefault(c => c.Id == id);
        }

        public List<Comment> GetByPostId(int id)
        {
            return _context.Comment
                            .Include(c => c.Post)
                            .ThenInclude(p => p.UserProfile)
                            .Include(c => c.UserProfile)
                            .Where(c => c.PostId == id)
                            .OrderByDescending(c => c.CreateDateTime)
                            .ToList();
        }
        public List<Comment> GetCommentsByPost(int PostId)
        {
            var All = _context.Comment.Where(c => c.PostId == PostId).ToList();

            return All;
        }
        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Delete(Comment comment)
        {

            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}