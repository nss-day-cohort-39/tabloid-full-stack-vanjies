using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public PostController (ApplicationDbContext context) {
            _postRepository = new PostRepository (context);
            _userProfileRepository = new UserProfileRepository (context);
        }

        //getting the authorized user's 
        private UserProfile GetCurrentUserProfile () {
            var firebaseUserId = User.FindFirst (ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId (firebaseUserId);
        }

        [HttpGet]
        public IActionResult Get () {
            return Ok (_postRepository.GetAll ());
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post (Post post) {
            var currentUser = GetCurrentUserProfile ();
            post.UserProfileId = currentUser.Id;

            _postRepository.Add (post);
            return CreatedAtAction ("Get", new { id = post.Id }, post);
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;

            _postRepository.Update(post);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }
    }


}