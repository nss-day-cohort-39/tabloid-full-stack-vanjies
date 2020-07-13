using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers {
    [Route ("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PostController : ControllerBase {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public PostController (ApplicationDbContext context) {
            _postRepository = new PostRepository (context);
            _userProfileRepository = new UserProfileRepository (context);
        }

        [HttpGet]
        public IActionResult Get () {
            return Ok (_postRepository.GetAll ());
        }

        [HttpGet ("{id}")]
        public IActionResult Get (int id) {
            var post = _postRepository.GetById (id);
            if (post == null) {
                return NotFound ();
            }
            return Ok (post);
        }

        [HttpGet ("getbyuser")]
        public IActionResult GetByUser () {
            var firebaseUserId = User.FindFirst (ClaimTypes.NameIdentifier).Value;
            return Ok (_postRepository.GetByFirebaseUserId (firebaseUserId));
        }

        private UserProfile GetCurrentUserProfile () {
            var firebaseUserId = User.FindFirst (ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId (firebaseUserId);
        }

    }
}