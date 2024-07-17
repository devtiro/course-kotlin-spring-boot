package com.devtiro.bookstore.services.impl

import com.devtiro.bookstore.*
import com.devtiro.bookstore.domain.AuthorSummary
import com.devtiro.bookstore.repositories.AuthorRepository
import com.devtiro.bookstore.repositories.BookRepository
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.repository.findByIdOrNull

@SpringBootTest
@Transactional
class BookServiceImplTest @Autowired constructor(
    private val underTest: BookServiceImpl,
    private val bookRepository: BookRepository,
    private val authorRepository: AuthorRepository
){

    @Test
    fun `test that createUpdate throws IllegalStateException when Author does not exist`() {
        val authorSummary = AuthorSummary(id=999L)
        val bookSummary = testBookSummaryA(BOOK_A_ISBN, authorSummary)
        assertThrows<IllegalStateException> {
            underTest.createUpdate(BOOK_A_ISBN, bookSummary)
        }
    }

    @Test
    fun `test that createUpdate successfully creates book in the database`() {
        val savedAuthor = authorRepository.save(testAuthorEntityA())
        assertThat(savedAuthor).isNotNull()

        val authorSummary = AuthorSummary(id=savedAuthor.id!!)
        val bookSummary = testBookSummaryA(BOOK_A_ISBN, authorSummary)
        val (savedBook, isCreated) = underTest.createUpdate(BOOK_A_ISBN, bookSummary)
        assertThat(savedBook).isNotNull()

        val recalledBook = bookRepository.findByIdOrNull(BOOK_A_ISBN)
        assertThat(recalledBook).isNotNull()
        assertThat(recalledBook).isEqualTo(savedBook)
        assertThat(isCreated).isTrue()
    }

    @Test
    fun `test that createUpdate successfully updates book in the database`() {
        val savedAuthor = authorRepository.save(testAuthorEntityA())
        assertThat(savedAuthor).isNotNull()

        val savedBook = bookRepository.save(testBookEntityA(BOOK_A_ISBN, savedAuthor))
        assertThat(savedBook).isNotNull()

        val authorSummary = AuthorSummary(id=savedAuthor.id!!)
        val bookSummary = testBookSummaryB(BOOK_A_ISBN, authorSummary)
        val (updatedBook, isCreated) = underTest.createUpdate(BOOK_A_ISBN, bookSummary)
        assertThat(updatedBook).isNotNull()

        val recalledBook = bookRepository.findByIdOrNull(BOOK_A_ISBN)
        assertThat(recalledBook).isNotNull()
        assertThat(isCreated).isFalse()
    }

}