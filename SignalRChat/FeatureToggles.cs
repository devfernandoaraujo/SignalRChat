using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SignalRChat
{
    /// <summary>
    /// This class is used to load all configuration from file configuration
    /// </summary>
    public class FeatureToggles
    {
        /// <summary>
        /// Bellow must be assigned all parameters the must be load from appconfig.json 
        /// </summary>
        public bool EnableDeveloperExceptions { get; set; }
    }
}
