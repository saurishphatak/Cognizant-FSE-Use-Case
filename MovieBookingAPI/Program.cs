using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using MovieBookingAPI.Interfaces;
using MovieBookingAPI.Models;
using MovieBookingAPI.Repositories;
using System.Text;

namespace MovieBookingAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            var key = builder.Configuration.GetValue<string>("TokenKey");
            // Add services to the container.
            // var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STR");
            // var databaseName = Environment.GetEnvironmentVariable("DB_NAME");
            // var movieCollectionName = Environment.GetEnvironmentVariable("MOVIE_COLLECTION_NAME");
            // var ticketCollectionName = Environment.GetEnvironmentVariable("TICKET_COLLECTION_NAME");

            // var mongoDbConfig = new MongoDbConfig() { ConnectionString = connectionString, DatabaseName = databaseName, MovieCollectionName = movieCollectionName, TicketCollectionName = ticketCollectionName };

            builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection("MongoDbConfig"));
            // builder.Services.AddSingleton<IMongoDbConfig>(mongoDbConfig);

            builder.Services.AddSingleton<IMongoDbConfig>(sp => sp.GetRequiredService<IOptions<MongoDbConfig>>().Value);

            builder.Services.AddSingleton<IMongoClient>(mongoConnection => new MongoClient(builder.Configuration.GetValue<string>("MongoDbConfig:ConnectionString")));

            builder.Services.AddScoped<IMovieRepository, MovieRepository>();
            builder.Services.AddScoped<ITicketRepository, TicketRepository>();

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = true;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = "hemasundarrao",
                    ValidAudience = "hemasundarrao",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };

            });



            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please Insert Token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference=new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            // if (app.Environment.IsDevelopment())
            // {
            app.UseSwagger();
            app.UseSwaggerUI();
            // }

            app.UseCors();

            app.UseHttpsRedirection();

            //app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}