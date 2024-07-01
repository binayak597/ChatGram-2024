import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

    //read the token
    const token = req.cookies?.jwtToken;

    //token is empty
    if(!token) return res.status(401).json({error: "Unauthorized - No Token Provied"});

    //veriy the token

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if(!payload) return res.status(401).json({error: "Unauthorized - Invalid Token"});

        req.userId = payload.userId;

        console.log("Payload details of JWTToken -> ", payload);

    } catch (err) {

        return res.status(401).json({error: err});
    }

    next();
}

export default jwtAuth;