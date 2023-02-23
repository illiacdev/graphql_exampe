package com.example.back_end.graphql;

import com.example.back_end.domain.Member;
import com.example.back_end.domain.MemberRepository;
import com.example.back_end.domain.Team;
import com.example.back_end.domain.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

//@Slf4j
@org.springframework.stereotype.Service
@AllArgsConstructor
public class Service {
    final TeamRepository teamRepository;
    final MemberRepository memberRepository;

    //    @Transactional
    public List<Team> teams() {
        return teamRepository.findAll();
    }

    @Transactional
    public List<Member> members() {
        return memberRepository.findAll();
    }

    public Optional<Team> createTeam(String name) {
        return Optional.of(name)
                .map(s -> Team.builder().name(name).build())
                .map(team -> teamRepository.save(team));
    }

    @Transactional
    public Optional<Member> createMember(String teamName, String name) {

        return Optional.of(teamName)
                .flatMap(s -> teamRepository.findByName(teamName))
                .flatMap(team -> Optional
                        .of(Member.builder().name(name).team(team).build())
                        .map(member -> {
                            Member save = memberRepository.save(member);
                            team.getMembers().add(save);
                            teamRepository.save(team);
                            return save;
                        }));
    }

    public Optional<Team> deleteTeam(String name) {
        return Optional.of(name)
                .flatMap(teamRepository::findByName)
                .map(team -> {
                    teamRepository.delete(team);
                    return team;
                });
    }
}
