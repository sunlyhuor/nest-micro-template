# Nest Js POS Template make system and faster to build

## Documents

1. Decorators
    <!-- more -->
    We have make some decorators for make you easy to develop likes @Auth , @Roles(), @Public() these decorator is make you easy to build your system
     <!-- more -->
    > **@Auth()** is a decorator using as paramater make get user data when them try to access and dataType is XAuth.
    <!-- more -->
    **Example**

        @Post()

        async test( res:any, req:any, @Auth() auth:XAuth ){}
    <!-- more -->
    > **@Roles()** is decoratior using for set permission for protect route.
    <!-- more -->
    **Example**

        @Roles(RoleEnum.Admin, ....)

        @Post()

        async test( res:any, req:any ){}
    <!-- more -->
    > **@Public()** is decoratior public router can access by all user.
    <!-- more -->
    **Example**

        @Roles(RoleEnum.Admin, ....)

        @Post()

        async test( res:any, req:any ){}

2. Libraries
    <!--  -->
    We have also build and config some libraries for you likes **bcrypt**, **cache**, **config**, **event**, **i18n**, **jwt**, **mailer**, **microservice**, **mongoose**, **schedule**, **throttler**, **websocket**
    <!--  -->
    ### *Note 
    > All libraries you can read descript inside lib folder
    <!--  -->

    **2.1 Bcrypt**
    <!--  -->
        Using bcrypt password and can't uncrypt.

    **2.2 Cache**
    <!--  -->
        Using for cache data in memory for fast reponse to user.
    **2.3 Config**
    <!--  -->
        Using for config some file you need.
    **2.4 Event**
    <!--  -->
        Using event for send event to another service make to fast response to use. Althrough event not complete yet.
    **2.5 I18n**
    <!-- more -->
        Using for translate to another lang likes khmer, english or chinses by client send headers x-lang = en | kh etc.
    **2.5 Jwt (Json Web Token)**
    <!--  -->
        Using for generate token for identify user.
    **2.6 Mailer**
    <!--  -->
        Using send mail with template to user.
    **2.7 Microservices**
    <!--  -->
        Our template also support microservices also setup with Rabbitmq and modify to your required.
    **2.8 Mongoose**
    <!--  -->
        Our template using mongodb not support other Database. But you can custom your self.
    **2.9 Schedule**
    <!--  -->
        Using for auto task.
    **2.10 Throttler**
    <!--  -->
        Using for protect route by set set limit for request.
     **2.11 Websocket**
    <!--  -->
        Using for real communication between user and server like chat etc.
<h1 style="text-align: center;padding: 10px;" >Thanks for using our template</h1>