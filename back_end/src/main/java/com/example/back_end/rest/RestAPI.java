package com.example.back_end.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class RestAPI {
    @PostMapping(path = "/upload",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    String upload(@RequestParam(value = "file")MultipartFile file){

        return "OK!";
    }

}
