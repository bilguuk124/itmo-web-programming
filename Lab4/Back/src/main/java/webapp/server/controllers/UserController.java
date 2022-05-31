package webapp.server.controllers;

import webapp.server.controllers.classes.User;
import webapp.server.services.UserService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("/user-controller")
public class UserController {

    @EJB
    UserService service;

    @POST
    @Path("/add-user")
    @Consumes("application/json")
    public boolean addUserResponse(User user){
        return service.addEntity(user.getLogin(), user.getPassword());
    }

    @GET
    @Path("/add-user")
    public Response Ok(User user){
        return Response.ok().build();
    }


    @POST
    @Path("/check-user")
    @Consumes("application/json")
    public boolean checkUserResponse(User user){
        return service.checkEntity(user.getLogin(),user.getPassword());
    }



}

