using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;



        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Category> GetAll()
        {
            var All = _context.Category.ToList();
            return All;
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }


        public Category GetById(int id)
        {
            return _context.Category.FirstOrDefault(c => c.Id == id);
        }

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
