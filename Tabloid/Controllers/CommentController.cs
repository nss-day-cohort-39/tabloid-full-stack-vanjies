using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;
namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepo;
        private readonly UserProfileRepository _userProfileRepository;
        public CommentController(ApplicationDbContext context)
        {
            _commentRepo = new CommentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepo.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpGet("getbypost/{id}")]
        public IActionResult GetByPost(int id)
        {
            return Ok(_commentRepo.GetByPostId(id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();
            comment.UserProfileId = currentUser.Id;

            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUserProfile();
            comment.UserProfileId = currentUser.Id;

            _commentRepo.Update(comment);
            return NoContent();
        }

    }
}

