package com.devtiro.bookstore.controllers

import com.devtiro.bookstore.domain.dto.AuthorDto
import com.devtiro.bookstore.domain.entities.AuthorEntity
import com.devtiro.bookstore.services.AuthorService
import com.devtiro.bookstore.toAuthorDto
import com.devtiro.bookstore.toAuthorEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthorsController(private val authorService: AuthorService) {

    @PostMapping(path = ["/v1/authors"])
    fun createAuthor(@RequestBody authorDto: AuthorDto): AuthorDto {
        return authorService.save(
            authorDto.toAuthorEntity()
        ).toAuthorDto()
    }

}