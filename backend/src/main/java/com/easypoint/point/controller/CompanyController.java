package com.easypoint.point.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("api/companies")
public class CompanyController {

    /*
     *  GET /api/assets?page&size
     */
    @RequestMapping(method = GET)
    public String listAll() {
        List<String> teste = new ArrayList<>();

        teste.add("1");
        teste.add("2");
        teste.add("3");
        return "Hello";
    }

}
