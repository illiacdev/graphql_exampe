package com.example.back_end.graphql.extend;

import com.example.back_end.domain.Member;
import com.example.back_end.domain.Team;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Controller
public class ExtendController {

    final ExtendService extendService;


    @QueryMapping
    List<Team> teams() {
        return extendService.teams();
    }


    @QueryMapping
    List<Member> members() {
        return extendService.members();
    }

    @MutationMapping
    Optional<Team> createTeam(@Argument("name") String name) {
        return extendService.createTeam(name);
    }


    @MutationMapping
    Optional<Member> createMember(@Argument("teamName") String teamName, @Argument("name") String name) {
        return extendService.createMember(teamName, name);
    }

    @MutationMapping
    Optional<Team> deleteTeam(@Argument("name") String name) {
        return extendService.deleteTeam(name);
    }


    @MutationMapping
    Mono<Long> delete_member(@Argument("name") String name) {
        return extendService.delete_member(name).map(aLong -> Mono.just(aLong)).orElse(Mono.empty());

    }
}
