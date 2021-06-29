# Social-Connect-Web-Application

This is a Social Media Application Model with name Social-Connect where you can Add Friends, Post Images, Edit Post, Delete Post, Edit Profile, Set and Edit Bio & Cover image, there are other features also as  Photo Gallery Viewer, Friends Profile View ,Youtube video search/play ,Location Search & Info Provider, Covid-19 Info provider, Theme color & background change features.

This Application was entirely designed and developed by me from Scratch. Its front-end was developed in Angular 8 framework, with Bootstrap, Angular Material UI, & the back-end was developed using JAVA, Spring Boot (for dependency Injection and the creation and handling of Restful API and other services). The whole App is Deployed over AWS EB (Elastic Beanstalk), used RDS & AmazonS3 services of AWS for database & other storage purpose. The Application was made responsive for both Desktop & Mobile devices.

[![Social-Connect](https://img.youtube.com/vi/AGWALp9dThs/maxresdefault.jpg)](https://www.youtube.com/watch?v=AGWALp9dThs)

Link: [youtube](https://www.youtube.com/watch?v=AGWALp9dThs)

Link: [Social-Connect](http://social-connect-webapp.s3-website.ap-south-1.amazonaws.com)

## spring-boot
The main library providing features that support the other parts of Spring Boot. These include:

* The `SpringApplication` class, providing static convenience methods that can be used to write a stand-alone Spring Application.
  Its sole job is to create and refresh an appropriate Spring `ApplicationContext`.
* Embedded web applications with a choice of container (Tomcat, Jetty, or Undertow).
* First class externalized configuration support.
* Convenience `ApplicationContext` initializers, including support for sensible logging defaults.



## spring-boot-autoconfigure
Spring Boot can configure large parts of typical applications based on the content of their classpath.
A single `@EnableAutoConfiguration` annotation triggers auto-configuration of the Spring context.

Auto-configuration attempts to deduce which beans a user might need. For example, if `HSQLDB` is on the classpath, and the user has not configured any database connections, then they probably want an in-memory database to be defined.
Auto-configuration will always back away as the user starts to define their own beans.


## spring-boot-starters
Starters are a set of convenient dependency descriptors that you can include in your application.
You get a one-stop-shop for all the Spring and related technology you need without having to hunt through sample code and copy paste loads of dependency descriptors.
For example, if you want to get started using Spring and JPA for database access, include the `spring-boot-starter-data-jpa` dependency in your project, and you are good to go.



## spring-boot-cli
The Spring command line application compiles and runs Groovy source, allowing you to write the absolute minimum amount of code to get an application running.
Spring CLI can also watch files, automatically recompiling and restarting when they change.



## spring-boot-actuator
Actuator endpoints let you monitor and interact with your application.
Spring Boot Actuator provides the infrastructure required for actuator endpoints.
It contains annotation support for actuator endpoints.
This module provides many endpoints, including the `HealthEndpoint`, `EnvironmentEndpoint`, `BeansEndpoint`, and many more.

## spring-boot-actuator-autoconfigure
This provides auto-configuration for actuator endpoints based on the content of the classpath and a set of properties.
For instance, if Micrometer is on the classpath, it will auto-configure the `MetricsEndpoint`.
It contains configuration to expose endpoints over HTTP or JMX.
Just like Spring Boot AutoConfigure, this will back away as the user starts to define their own beans.


## spring-boot-test
This module contains core items and annotations that can be helpful when testing your application.



## spring-boot-test-autoconfigure
Like other Spring Boot auto-configuration modules, spring-boot-test-autoconfigure provides auto-configuration for tests based on the classpath.
It includes many annotations that can automatically configure a slice of your application that needs to be teste## spring-boot-loader
Spring Boot Loader provides the secret sauce that allows you to build a single jar file that can be launched using `java -jar`.
Generally you will not need to use `spring-boot-loader` directly, but instead work with the link:[Gradle](spring-boot-project/spring-boot-tools/spring-boot-gradle-plugin) or link:[Maven](spring-boot-project/spring-boot-tools/spring-boot-maven-plugin) plugin.



## spring-boot-devtools
The spring-boot-devtools module provides additional development-time features, such as automatic restarts, for a smoother application development experience.
Developer tools are automatically disabled when running a fully packaged application.


## Samples
Groovy samples for use with the command line application are available in link:[spring-boot-cli/samples](spring-boot-project/spring-boot-cli/samples).
To run the CLI samples, type `spring run <sample>.groovy` from the samples directory.



## Guides
The [spring.io](https://spring.io/) site contains several guides that show how to use Spring Boot step-by-step:

* [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/) is an introductory guide that shows you how to create an application, run it, and add some management services.
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/) is a guide to creating a REST web service and also shows how the server can be configured.
* [Converting a Spring Boot JAR Application to a WAR](https://spring.io/guides/gs/convert-jar-to-war/) shows you how to run applications in a web server as a WAR file.

## License
Spring Boot is Open Source software released under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.html).


## Angular Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
