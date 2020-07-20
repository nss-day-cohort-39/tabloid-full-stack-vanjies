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
    }
}