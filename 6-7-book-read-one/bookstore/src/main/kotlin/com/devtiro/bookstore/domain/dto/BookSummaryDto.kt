package com.devtiro.bookstore.domain.dto

data class BookSummaryDto(
    val isbn: String,
    val title: String,
    val description: String,
    val image: String,
    val author: AuthorSummaryDto
)