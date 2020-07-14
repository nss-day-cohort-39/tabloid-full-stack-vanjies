using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories {
    public class CategoryRepository {
        private readonly ApplicationDbContext _context;

        public CategoryRepository (ApplicationDbContext context) {
            _context = context;
        }

        public List<Category> GetAll () {
            var All = _context.Category.OrderBy (p => p.Name).ToList ();
            return All;
        }

        public void Add (Category category) {
            _context.Add (category);
            _context.SaveChanges ();
        }

        public Category GetById (int id) {
            return _context.Category.FirstOrDefault (c => c.Id == id);
        }
        public void Delete(int id)
        {
            var category = GetById(id);
            _context.Category.Remove(category);
            _context.SaveChanges();
        }

    }
}