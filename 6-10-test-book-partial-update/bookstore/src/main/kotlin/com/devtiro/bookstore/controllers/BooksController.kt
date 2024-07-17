package com.devtiro.bookstore.controllers

import com.devtiro.bookstore.domain.dto.BookSummaryDto
import com.devtiro.bookstore.domain.dto.BookUpdateRequestDto
import com.devtiro.bookstore.exceptions.InvalidAuthorException
import com.devtiro.bookstore.services.BookService
import com.devtiro.bookstore.toBookSummary
import com.devtiro.bookstore.toBookSummaryDto
import com.devtiro.bookstore.toBookUpdateRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/v1/books"])
class BooksController(val bookService: BookService) {

    @PutMapping(path = ["/{isbn}"])
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

    @GetMapping
    fun readManyBooks(@RequestParam("author") authorId: Long?): List<BookSummaryDto> {
        return bookService.list(authorId).map { it.toBookSummaryDto() }
    }

    @GetMapping(path = ["/{isbn}"])
    fun readOneBook(@PathVariable("isbn") isbn: String): ResponseEntity<BookSummaryDto> {
        return bookService.get(isbn)?.let { ResponseEntity(it.toBookSummaryDto(), HttpStatus.OK) }
            ?: ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PatchMapping(path = ["/{isbn}"])
    fun partialUpdateBook(
        @PathVariable("isbn") isbn: String,
        @RequestBody bookUpdateRequestDto: BookUpdateRequestDto
    ): ResponseEntity<BookSummaryDto> {
        try {
            val updatedBook = bookService.partialUpdate(isbn, bookUpdateRequestDto.toBookUpdateRequest())
            return ResponseEntity(updatedBook.toBookSummaryDto(), HttpStatus.OK)
        } catch (ex: IllegalStateException) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }

}
