using BL.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface ICategoryService
    {
        public string CategoryExistAsync(CategoryModel model);

    }
}
