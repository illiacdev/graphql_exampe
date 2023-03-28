package com.example.back_end.graphql.base;

import com.example.back_end.domain.base.Info;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@AllArgsConstructor
public class BaseController {
    final BaseService baseService;

    @QueryMapping
    LocalDateTime time() {
        return baseService.time();
    }

    @MutationMapping
    Info createInfo(@Argument("name") String name, @Argument("value") String value) {
        return baseService.createInfo(name, value);
    }

    @QueryMapping
    List<Info> info() {
        return baseService.info();
    }


}
