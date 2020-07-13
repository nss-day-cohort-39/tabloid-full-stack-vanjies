﻿using Microsoft.EntityFrameworkCore;
using Tabloid.Models;

namespace Tabloid.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Post> Post { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Tag> Tag { get; set; }
    }
}
