package com.devtiro.bookstore.repositories

import com.devtiro.bookstore.domain.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookRepository: JpaRepository<Book, String>
