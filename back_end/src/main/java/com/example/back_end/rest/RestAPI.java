package com.example.back_end.rest;

import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("/api")
public class RestAPI {
    //    @PostMapping(path = "/upload",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @PostMapping("/upload")
    Mono<String> upload(@RequestPart(value = "file") Mono<FilePart> file) {

        return Mono.<String>create(stringMonoSink -> {
            file.subscribe(filePart -> {
                File dest = new File(filePart.filename());
                filePart.transferTo(dest);
                try {
                    FileInputStream is = new FileInputStream(dest);
                } catch (FileNotFoundException e) {
                    throw new RuntimeException(e);
                }
                stringMonoSink.success(filePart.filename());
            },throwable -> {
                stringMonoSink.error(throwable);
            });
        });
//        return "OK!";
    }

}
