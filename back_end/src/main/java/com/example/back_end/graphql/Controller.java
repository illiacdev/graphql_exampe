package com.example.back_end.graphql;

import com.example.back_end.domain.Member;
import com.example.back_end.domain.Team;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Controller
@AllArgsConstructor
public class Controller {
    final Service service;

    @QueryMapping
    public String hello(){
        return "Hello!";
    }

    @QueryMapping
    List<Team> teams(){
        return service.teams();
    }


    @QueryMapping
    List<Member> emebers(){
        return service.members();
    }

    @MutationMapping
    Optional<Team> createTeam(@Argument("name") String name){
        return service.createTeam(name);
    }


    @MutationMapping
    Optional<Member> createMember(@Argument("teamName") String teamName,@Argument("name") String name){
        return service.createMember(teamName,name);
    }

    @MutationMapping
    Optional<Team> deleteTeam(@Argument("name")String name){
        return service.deleteTeam(name);
    }


    @MutationMapping
    Mono<Long> delete_member(@Argument("name")String name){
        return service.delete_member(name).map(aLong -> Mono.just(aLong)).orElse(Mono.empty());

    }
}
