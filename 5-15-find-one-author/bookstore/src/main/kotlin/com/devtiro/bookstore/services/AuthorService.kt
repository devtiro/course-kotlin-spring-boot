package com.devtiro.bookstore.services

import com.devtiro.bookstore.domain.entities.AuthorEntity

interface AuthorService {

    fun save(authorEntity: AuthorEntity): AuthorEntity

    fun list(): List<AuthorEntity>

    fun get(id: Long): AuthorEntity?

}