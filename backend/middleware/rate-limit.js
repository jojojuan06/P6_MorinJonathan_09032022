// limite le nombre de requete utilisateur
const  rateLimit  =  require( 'express-rate-limit' );


//Pour l'utiliser dans un serveur API uniquement où le limiteur de débit doit être appliqué à toutes les requêtes 
const limiter = {
    get: rateLimit({ //pour les route get
         windowMs: 1 * 60 * 1000, // 1 minute
         max: 60, // Limit each IP to 60 request per `window`
         standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
         legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }),
    modify: rateLimit({ // (post,put)
         windowMs: 10 * 60 * 1000, // 10 minutes (min,seconde,ms(1s))
         max: 20, // Limit each IP to 20 requests per `window` (here, per 10 minutes)
        standardHeaders: true,
        legacyHeaders: false,
    }),
    auth: rateLimit({
         windowMs: 10 * 60 * 1000, // 10 minutes
         max: 5, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
        standardHeaders: true,
        legacyHeaders: false,
    })
};

//importe le module
module.exports = limiter;