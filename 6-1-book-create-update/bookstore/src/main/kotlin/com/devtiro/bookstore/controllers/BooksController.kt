package com.devtiro.bookstore.controllers

import com.devtiro.bookstore.domain.dto.BookSummaryDto
import com.devtiro.bookstore.exceptions.InvalidAuthorException
import com.devtiro.bookstore.services.BookService
import com.devtiro.bookstore.toBookSummary
import com.devtiro.bookstore.toBookSummaryDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class BooksController(val bookService: BookService) {

@PutMapping(path = ["/v1/books/{isbn}"])
fun createFullUpdateBook(
    @PathVariable("isbn") isbn: String,
    @RequestBody book: BookSummaryDto
): ResponseEntity<BookSummaryDto> {
    try {
        val (savedBook, isCreated) = bookService.createUpdate(isbn, book.toBookSummary())
        val responseCode = if (isCreated) HttpStatus.CREATED else HttpStatus.OK
        return ResponseEntity(savedBook.toBookSummaryDto(), responseCode)

    } catch (ex: InvalidAuthorException) {
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    } catch (ex: IllegalStateException) {
        return ResponseEntity(HttpStatus.BAD_REQUEST)
    }
}
}