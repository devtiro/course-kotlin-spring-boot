package com.devtiro.bookstore.controllers

import com.devtiro.bookstore.domain.Author
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthorsController {

    @PostMapping(path = ["/v1/authors"])
    fun createAuthor(@RequestBody author: Author) {

    }

}