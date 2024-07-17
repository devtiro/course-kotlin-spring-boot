package com.devtiro.bookstore.domain

data class BookSummary(
    val isbn: String,
    val title: String,
    val description: String,
    val image: String,
    val author: AuthorSummary
)