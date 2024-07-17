package com.devtiro.bookstore.services

import com.devtiro.bookstore.domain.BookSummary
import com.devtiro.bookstore.domain.entities.BookEntity

interface BookService {

    fun createUpdate(isbn: String, bookSummary: BookSummary): Pair<BookEntity, Boolean>

}