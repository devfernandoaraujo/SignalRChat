using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace SignalRChat
{
    public class Startup
    {

        
        private readonly IConfigurationRoot configuration;

        /// <summary>
        /// Default constructor
        /// </summary>
        public Startup(IHostingEnvironment env)
        {
            configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .AddJsonFile($"{env.ContentRootPath}/appconfig.json")
                .Build();

        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //Allowing the resource of Dependency Injection
            //Singleton for all application
            services.AddSingleton<FeatureToggles>(x => new FeatureToggles
            {
                EnableDeveloperExceptions = configuration.GetValue<bool>("FeatureToggles:EnableDeveloperExceptions")
            });

            //Enabling MVC
            services.AddMvc();

            //Enabling the connection cross-domain
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyMethod().AllowAnyHeader()
                        .WithOrigins("https://localhost:44341")
                        .AllowCredentials();
            }));

            //Enabling SignalR
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, FeatureToggles features)
        {

            //This show the default error page if the environment is not in development
            app.UseExceptionHandler($"/View/Shared/Error.cshtml");

            
            //Check if the Environment is running under development 
            if(features.EnableDeveloperExceptions)
            {
                //Show the error for the developer
                app.UseDeveloperExceptionPage();
            }

            //Enabling the use of static files
            app.UseStaticFiles();

            //Using Cors
            app.UseCors("CorsPolicy");

            //Using Hub
            app.UseSignalR(routes =>
            {
                routes.MapHub<MessageHub>($"/messagehub");
            });

            //Using MVC
            app.UseMvc(routes =>
            {
                routes.MapRoute("Default",
                    "{controller=Home}/{action=Index}/{id?}");
            });

            
            app.UseFileServer();
        }
    }
}
