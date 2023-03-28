package com.example.back_end.domain.base;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Info {
    @Id
    String name;
    String value;

    @Builder.Default
    @OneToMany
    List<ExtraInfo> extraInfos = new ArrayList<>();
}
