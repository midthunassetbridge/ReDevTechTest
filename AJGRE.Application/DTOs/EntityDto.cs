using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AJGRE.Application.DTOs
{
    public record EntityDto(
    Guid Id,
    string Name,
    string Domicile,
    bool Accepted
);
}
