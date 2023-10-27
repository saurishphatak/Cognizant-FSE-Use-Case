using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieBookingAPI.Interfaces;
using MovieBookingAPI.Models;
using System.Data;

namespace MovieBookingAPI.Controllers
{
    [Route("api/v1.0/moviebooking")]
    [ApiController]
    [EnableCors]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketsController(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }


        [Authorize(Roles = "Admin, Member")]
        [HttpPost]
        [Route("{moviename}/add")]
        public async Task<ActionResult> BookTickets([FromBody] Ticket ticket)
        {
            var response =await _ticketRepository.BookTickets(ticket);
            if (response == -1)
            {
                return BadRequest("Booking failed as there is no requested number of seats");
            }
            else if(response == 0){
                return BadRequest("You are trying to book already booked seat");
            }
            return Ok("Booked Successfully");
        }


        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("{moviename}/update/{theatrename}")]
        public ActionResult UpdateStatus(string moviename,string theatrename)
        {
            var status = _ticketRepository.UpdateTicketStatus(moviename, theatrename);
            return Ok(status);
        }

        [Authorize(Roles = "Admin, Member")]
        [HttpGet]
        [Route("{movieName}/getBookingInfo/{theatreName}")]
        public  ActionResult GetBookInfo(string movieName,string theatreName)
        {
            Console.WriteLine($"{movieName} {theatreName}");

            var getBookedTickets =  _ticketRepository.getBookedSeats(movieName,theatreName);
            var totalSeats = _ticketRepository.getTotalTickets(movieName, theatreName);
            return Ok(new 
            {
                totalSeatsAvailable=totalSeats,
                bookedTickets=getBookedTickets,
                
            });
        }

        [Authorize(Roles = "Admin, Member")]
        [HttpGet]
        [Route("getticketsbyuser/{loginId}")]
        public async Task<ActionResult> getTickets(string loginId)
        {
            var tickets = await _ticketRepository.getTickets(loginId);
            return Ok(tickets);
        }
    }
}
