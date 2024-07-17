package com.devtiro.bookstore

import com.devtiro.bookstore.domain.dto.AuthorDto
import com.devtiro.bookstore.domain.entities.AuthorEntity

fun testAuthorDtoA(id: Long? = null) = AuthorDto(
    id = id,
    name = "John Doe",
    age = 30,
    description = "Some description",
    image = "author-image.jpeg",
)

fun testAuthorEntityA(id: Long? = null) = AuthorEntity(
    id = id,
    name = "John Doe",
    age = 30,
    description = "Some description",
    image = "author-image.jpeg",
)

fun testAuthorEntityB(id: Long? = null) = AuthorEntity(
    id=id,
    name="Don Joe",
    age=65,
    description = "Some other description",
    image = "some-other-image.jpeg"
)

