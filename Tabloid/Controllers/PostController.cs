
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }


        //getting the authorized user's 
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

      

        [Authorize]
        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;

            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        //[HttpGet("getbyuser/{id}")]
        //public IActionResult GetByUser(int id)
        //{
        //    return Ok(_postRepository.GetByUserProfileId(id));
        //}

        //[HttpPost]
        //public IActionResult Post(Post post)
        //{
        //    _postRepository.Add(post);
        //    return CreatedAtAction("Get", new { id = post.Id }, post);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Post post)
        //{
        //    if (id != post.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _postRepository.Update(post);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _postRepository.Delete(id);
        //    return NoContent();
        //}

        ////https://localhost:5001/api/post/search?q=p&sortDesc=false
        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_postRepository.Search(q, sortDesc));
        //}

        ////https://localhost:5001/api/post/hottest?since=2020-06-29
        //[HttpGet("hottest")]
        //public IActionResult Hottest(string since)
        //{
        //    return Ok(_postRepository.Hottest(since));
        //}
    }
}