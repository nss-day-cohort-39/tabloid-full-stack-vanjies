using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
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
            var All = _context.Category.OrderBy(p => p.Name).ToList();
            return All;
        }

        public List<Category> GetByFirebaseUserId(string id)
        {
            return _context.Category.ToList();
        }
    }
}
