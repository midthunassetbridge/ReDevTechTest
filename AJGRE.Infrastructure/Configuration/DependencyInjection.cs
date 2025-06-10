using AJGRE.Infrastructure.Repository;
using AJRE.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AJGRE.Infrastructure.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSingleton<ISanctionedEntityRepository, SanctionedEntityRepository>();
        
       
            return services;
        }
    }
}
