// limite le nombre de requete utilisateur (eviter les attaque de force brute)
const  rateLimit  =  require( 'express-rate-limit' );


//Pour l'utiliser dans un serveur API uniquement où le limiteur de débit doit être appliqué à toutes les requêtes 
const limiter = {
    get: rateLimit({ //pour les route get
         windowMs: 1 * 60 * 1000, // 1 minute
         max: 60, // Limitez chaque IP à 60 requêtes par `window` 
         standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
         legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }),
    modify: rateLimit({ // (post,put)
         windowMs: 10 * 60 * 1000, // 10 minutes (min,seconde,ms(1s))
         max: 20, // Limitez chaque IP à 20 requêtes par `window` (ici, par 10 minutes)
        standardHeaders: true,
        legacyHeaders: false,
    }),
    auth: rateLimit({
         windowMs: 10 * 60 * 1000, // 10 minutes
         max: 10, // Limitez chaque IP à 5 requêtes par `window` (ici, par 10 minutes)
        standardHeaders: true,
        legacyHeaders: false,
    })
};

//importe le module
module.exports = limiter;