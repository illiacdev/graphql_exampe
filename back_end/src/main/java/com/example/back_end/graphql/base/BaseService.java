package com.example.back_end.graphql.base;

import com.example.back_end.domain.base.Info;
import com.example.back_end.domain.base.InfoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

//@Slf4j
@Service
@AllArgsConstructor
public class BaseService {

    final InfoRepository infoRepository;

    public LocalDateTime time() {
        return LocalDateTime.now();
    }

    public List<Info> info() {
        return infoRepository.findAll();
    }

    public Info createInfo(String name, String value) {

        Info build = Info.builder().name(name).value(value).build();
        return infoRepository.save(build);
    }

}
