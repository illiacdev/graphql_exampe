package com.example.back_end.domain;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, String> {

    @EntityGraph(attributePaths = {"members"})
    @Override
    List<Team> findAll();

    Optional<Team> findByName(String name);
}