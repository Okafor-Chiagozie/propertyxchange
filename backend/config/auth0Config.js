import {auth} from "express-oauth2-jwt-bearer"

const jwtCheck = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-7f1xt3q761kj5klp.us.auth0.com/",
  jwksUri: "https://dev-7f1xt3q761kj5klp.us.auth0.com/.well-known/jwks.json",
  tokenSigningAlg: "RS256",
});

export default jwtCheck