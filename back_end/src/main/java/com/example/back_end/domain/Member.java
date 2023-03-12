package com.example.back_end.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    Integer _경력;

    @Transient
    Integer career;

    public Integer getCareer() {
        return _경력;
    }

//    @Cascade(CascadeType.ALL)
//    @ManyToOne
//    Team team;
}
