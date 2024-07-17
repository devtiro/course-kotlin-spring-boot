package com.devtiro.bookstore.repositories

import com.devtiro.bookstore.domain.Author
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AuthorRepository : JpaRepository<Author,Long?>