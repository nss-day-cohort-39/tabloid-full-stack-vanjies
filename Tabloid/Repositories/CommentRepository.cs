using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public List<Comment> GetCommentsByPost(int PostId)
        {
            var All = _context.Comment.Where(c => c.PostId == PostId).ToList();

            return All;
        }
        public void Delete(Comment comment)
        {

            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
