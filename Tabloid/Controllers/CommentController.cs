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
        
        private readonly UserProfileRepository _userProfileRepository;
        private readonly CommentRepository _commentRepository;

        public CommentController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
            _commentRepository = new CommentRepository(context);
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

            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

    }
}
